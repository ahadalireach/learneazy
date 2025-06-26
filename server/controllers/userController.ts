import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis";
import { sendToken } from "../utils/jwt";
import jwt, { Secret } from "jsonwebtoken";
import User, { IUser } from "../models/User";
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
