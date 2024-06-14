import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "No such user!",
        success: false,
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "logged-in successfully",
      success: true,
      data: payload,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
      success: false,
    });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    await res.clearCookie("token");

    res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
      success: false,
    });
  }
};
