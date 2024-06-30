import { Request, Response } from "express";
import Category from "../models/category.model";

export const createRoomType = async (req: any, res: Response) => {
  try {
    const { name, code, basePrice, checkinTime, checkoutTime, propertyId } =
      req.body;

    const roomTypeExist = await Category.findOne({
      name,
      code,
      hotel: propertyId,
    });

    if (roomTypeExist) {
      return res.status(400).json({
        message: "Room type already exists",
        success: false,
      });
    }

    const roomType = new Category({
      name,
      code,
      basePrice,
      checkinTime,
      checkoutTime,
      hotel: propertyId,
    });

    await roomType.save();

    res.status(201).json({ message: "Room type created", success: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message, success: false });
  }
};

export const getRoomTypes = async (req: Request, res: Response) => {
  const { propertyId } = req.query;
  try {
    const roomTypes = await Category.find({ hotel: propertyId });

    res.status(200).json({
      success: true,
      data: roomTypes,
      count: roomTypes.length,
      message: "Room types fetched",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message, success: false });
  }
};

export const updateRoomType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { propertyId } = req.query;
  const { name, code, basePrice, checkinTime, checkoutTime } = req.body;

  try {
    const roomType = await Category.findOneAndUpdate(
      { _id: id, hotel: propertyId },
      {
        $set: {
          name,
          code,
          basePrice,
          checkinTime,
          checkoutTime,
        },
      },
      { new: true }
    );

    if (!roomType) {
      return res
        .status(404)
        .json({ message: "Room type not found", success: false });
    }

    res.status(200).json({ message: "Room type updated", success: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message, success: false });
  }
};
