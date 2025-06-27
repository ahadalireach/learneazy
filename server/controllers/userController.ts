import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import User, { IUser } from "../models/User";
import { getUserById } from "../services/user.service";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import cloudinary from "cloudinary";
import sendMail from "../utils/sendMail";
import errorHandler from "../utils/errorHandler";
import catchAsyncError from "../middleware/catchAsyncError";

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(
          new errorHandler(
            "An account with this email address already exists. Please sign in to your existing account or use a different email.",
            400
          )
        );
      }

      const user: IRegisterUser = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      await sendMail({
        name,
        email,
        subject: "Activate Your Learneazy Account",
        activationCode,
        data: {
          user: { name: user.name },
          activationCode,
        },
      });

      res.status(200).json({
        success: true,
        message: `Registration successful! We've sent a 4-digit activation code to ${email
          .trim()
          .toLowerCase()}. Please check your email inbox (and spam folder) and enter the code to activate your account within 5 minutes.`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(
        new errorHandler(
          "Registration failed due to a server error. Please try again in a few moments.",
          500
        )
      );
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

interface IActivationRequest {
  activationToken: string;
  activationCode: string;
}

export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activationToken, activationCode } = req.body as IActivationRequest;

    try {
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activationToken,
        process.env.JWT_SECRET as Secret
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activationCode) {
        return next(
          new errorHandler(
            "Invalid activation code. Please check your email for the correct 4-digit code and try again.",
            400
          )
        );
      }

      const { name, email, password } = newUser.user;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(
          new errorHandler(
            "This account has already been activated. Please proceed to sign in with your credentials.",
            400
          )
        );
      }

      await User.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
      });
    } catch (error) {
      next(new errorHandler("Activation failed. Invalid token.", 400));
    }
  }
);

interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(
          new errorHandler(
            "Please enter both your email and password to log in.",
            400
          )
        );
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(
          new errorHandler(
            "No account found with this email address. Please check your email or register for a new account.",
            400
          )
        );
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(
          new errorHandler(
            "Incorrect password. Please check your password and try again.",
            400
          )
        );
      }
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = req.user?._id;
      if (userId) {
        await redis.del(userId.toString());
      }

      res.status(200).json({
        success: true,
        message:
          "You have been successfully signed out. Thank you for using Learneazy!",
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user?.role)) {
      return next(
        new errorHandler(
          "You do not have permission to perform this action.",
          403
        )
      );
    }

    next();
  };
};

export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded: any = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      if (!decoded) {
        return next(new errorHandler("Couldn't refresh token.", 400));
      }

      const session = await redis.get(decoded.id);
      if (!session) {
        return next(
          new errorHandler("Session expired. Please log in again.", 401)
        );
      }

      const user = JSON.parse(session) as IUser;
      if (!user) {
        return next(new errorHandler("User not found.", 404));
      }

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user?._id as string, JSON.stringify(user), "EX", 604800);

      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id?.toString();

      if (!userId) {
        return next(new errorHandler("User not found.", 404));
      }

      getUserById(userId, res);
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

export const socialAuth = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = await User.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUserInfo;

      const userId = req.user?._id?.toString();
      if (!userId) {
        return next(new errorHandler("User not found.", 404));
      }

      const user = await User.findById(userId);
      if (!user) {
        return next(new errorHandler("User not found.", 404));
      }

      if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return next(
            new errorHandler("Email already exists with this email", 400)
          );
        }
        user.email = email;
      }

      if (name) {
        user.name = name;
      }

      await user.save();
      await redis.set(userId as string, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export const updateUserPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;
      if (!oldPassword || !newPassword) {
        return next(
          new errorHandler("Please enter old and new password.", 400)
        );
      }

      const userId = req.user?._id?.toString();
      if (!userId) {
        return next(new errorHandler("User not found.", 404));
      }

      const user = await User.findById(userId).select("+password");
      if (!user) {
        return next(new errorHandler("User not found.", 404));
      }

      if (user?.password === undefined) {
        return next(new errorHandler("Invalid user.", 400));
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);
      if (!isPasswordMatch) {
        return next(new errorHandler("Invalid old password.", 400));
      }

      user.password = newPassword;

      await user.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

interface IUpdateProfilePicture {
  avatar: string;
}

export const updateUserAvatar = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateProfilePicture;

      const userId = req.user?._id?.toString();
      if (!userId) {
        return next(new errorHandler("User not found.", 404));
      }

      const user = await User.findById(userId).select("+password");
      if (!user) {
        return next(new errorHandler("User not found.", 404));
      }

      if (avatar) {
        if (user?.avatar?.public_id) {
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);
