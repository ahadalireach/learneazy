import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import User, { IUser } from "../models/User";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import {
  getUserProfileFromCache,
  getAllUsers,
  changeUserRole,
} from "../services/userService";
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

export const registerNewUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(
          new errorHandler(
            "An account with this email address already exists. Please sign in to your existing account or use a different email.",
            409
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
        new errorHandler("Registration failed. Please try again.", 500)
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

export const activateUserAccount = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activationToken, activationCode } = req.body as IActivationRequest;

    try {
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activationToken,
        process.env.JWT_SECRET as Secret
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activationCode.trim()) {
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
            409
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
      return next(
        new errorHandler("Account activation failed. Please try again.", 500)
      );
    }
  }
);

interface ILoginRequest {
  email: string;
  password: string;
}

export const authenticateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      const user = await User.findOne({
        email: email.trim().toLowerCase(),
      }).select("+password");
      if (!user) {
        return next(
          new errorHandler(
            "Invalid email or password. Please check your credentials and try again.",
            401
          )
        );
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(
          new errorHandler(
            "Invalid email or password. Please check your credentials and try again.",
            401
          )
        );
      }
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

export const logoutCurrentUser = catchAsyncError(
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
      return next(new errorHandler("Logout failed. Please try again.", 500));
    }
  }
);

export const refreshUserAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;

      const decoded: any = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      if (!decoded) {
        return next(
          new errorHandler("Invalid refresh token. Please log in again.", 401)
        );
      }

      const session = await redis.get(decoded.id);
      if (!session) {
        return next(
          new errorHandler("Session expired. Please log in again.", 401)
        );
      }

      const user = JSON.parse(session) as IUser;
      if (!user) {
        return next(
          new errorHandler("User session not found. Please log in again.", 401)
        );
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
      return next(
        new errorHandler("Token refresh failed. Please log in again.", 500)
      );
    }
  }
);

interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

export const authenticateWithSocialMedia = catchAsyncError(
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
      return next(
        new errorHandler("Social authentication failed. Please try again.", 500)
      );
    }
  }
);

export const getCurrentUserProfile = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id?.toString();

      if (!userId) {
        return next(new errorHandler("User not found.", 404));
      }

      getUserProfileFromCache(userId, res);
    } catch (error: any) {
      return next(new errorHandler("Failed to retrieve user profile.", 500));
    }
  }
);

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserProfile = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUserInfo;

      const userId = req.user?._id?.toString();
      if (!userId) {
        return next(new errorHandler("User not authenticated.", 401));
      }

      const user = await User.findById(userId);
      if (!user) {
        return next(new errorHandler("User not found.", 404));
      }

      if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return next(
            new errorHandler(
              "This email is already registered with another account.",
              409
            )
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
      return next(
        new errorHandler("Failed to update profile. Please try again.", 500)
      );
    }
  }
);

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export const changeUserPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      if (oldPassword === newPassword) {
        return next(
          new errorHandler(
            "New password must be different from current password.",
            400
          )
        );
      }

      const userId = req.user?._id?.toString();
      if (!userId) {
        return next(new errorHandler("User not authenticated.", 401));
      }

      const user = await User.findById(userId).select("+password");
      if (!user) {
        return next(new errorHandler("User not found.", 404));
      }

      if (!user.password) {
        return next(
          new errorHandler(
            "Password change not available for social login accounts.",
            400
          )
        );
      }

      const isPasswordMatch = await user.comparePassword(oldPassword);
      if (!isPasswordMatch) {
        return next(new errorHandler("Current password is incorrect.", 400));
      }

      user.password = newPassword;

      await user.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(
        new errorHandler("Failed to change password. Please try again.", 500)
      );
    }
  }
);

interface IUpdateProfilePicture {
  avatar: string;
}

export const updateUserProfilePicture = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateProfilePicture;

      const userId = req.user?._id?.toString();
      if (!userId) {
        return next(new errorHandler("User not authenticated.", 401));
      }

      const user = await User.findById(userId);
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
      return next(
        new errorHandler(
          "Failed to update profile picture. Please try again.",
          500
        )
      );
    }
  }
);

export const getAllUsersForAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsers(res);
    } catch (error: any) {
      return next(new errorHandler("Failed to retrieve users list.", 500));
    }
  }
);

export const changeUserRoleByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;

      const validRoles = ["user", "admin", "instructor", "moderator"];
      if (!validRoles.includes(role)) {
        return next(
          new errorHandler(
            "Invalid role. Valid roles are: user, admin, instructor.",
            400
          )
        );
      }

      const isUserExist = await User.findOne({
        email: email.trim().toLowerCase(),
      });
      if (!isUserExist) {
        return next(
          new errorHandler("User not found with this email address.", 404)
        );
      }

      const id = isUserExist._id?.toString();
      if (!id) {
        return next(new errorHandler("Invalid user data.", 400));
      }

      changeUserRole(res, id, role);
    } catch (error: any) {
      return next(new errorHandler("Failed to update user role.", 500));
    }
  }
);

export const deleteUserByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      if (!user) {
        return next(new errorHandler("User not found.", 404));
      }

      await user.deleteOne({ id });
      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new errorHandler("Failed to delete user.", 500));
    }
  }
);
