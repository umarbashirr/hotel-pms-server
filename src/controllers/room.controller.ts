import { Request, Response } from "express";
import Room from "../models/room.model";

export const createRoom = async (req: Request, res: Response) => {
  const { roomNumber, roomCode, roomType, propertyId } = req.body;
  try {
    const room = new Room({
      name: roomNumber,
      code: roomCode,
      category: roomType,
      hotel: propertyId,
    });

    const newRoom = await room.save();

    if (!newRoom) {
      return res
        .status(400)
        .json({ message: "Room not created", success: false });
    }

    res.status(201).json({ message: "Room created", success: true });
  } catch (error: any) {
    res.status(500).json({ message: error?.message, success: false });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  const { propertyId } = req.query;
  try {
    const rooms = await Room.find({ hotel: propertyId }).populate("category");

    res.status(200).json({
      success: true,
      data: rooms,
      count: rooms.length,
      message: "Rooms fetched",
    });
  } catch (error: any) {
    res.status(500).json({ message: error?.message, success: false });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  const { roomNumber, roomCode, roomType, propertyId, roomId } = req.body;
  try {
    const roomId = req.params.id;

    const room = await Room.findOneAndUpdate(
      { _id: roomId, hotel: propertyId },
      {
        $set: {
          name: roomNumber,
          code: roomCode,
          category: roomType,
        },
      },
      { new: true }
    );

    if (!room) {
      return res
        .status(400)
        .json({ message: "Room not found", success: false });
    }

    res.status(200).json({ message: "Room updated", success: true });
  } catch (error: any) {
    return res.status(500).json({ message: error?.message, success: false });
  }
};
