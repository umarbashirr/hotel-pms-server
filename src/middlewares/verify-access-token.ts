import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyAccessToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};
