import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyUserAdminRights = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    const propertyId = req.body.propertyId || req.query.propertyId;

    if (!token) {
      return res.status(403).json({ message: "Unauthorized Request" });
    }

    if (!propertyId) {
      return res.status(403).json({ message: "Property ID is required" });
    }

    const user: any = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    const currentHotel = user.hotels.find(
      (user: any) => user?.hotel?._id === propertyId
    );

    if (!currentHotel) {
      return res
        .status(403)
        .json({ message: "You have no rights to complete this action!" });
    }

    console.log(currentHotel);

    if (currentHotel.role !== "ADMIN" && currentHotel.role !== "BOT") {
      return res.status(403).json({
        message: "Only property administrator can complete this operation",
      });
    }

    next();
  } catch (error: any) {
    return res.status(403).json({ message: error?.message, success: false });
  }
};

export default verifyUserAdminRights;
