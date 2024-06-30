import bcrypt from "bcryptjs";
import { Response } from "express";
import Hotel from "../models/hotel.model";
import User from "../models/user.model";
import UserHotel from "../models/userHotel.model";

export const getAllHotelsForAuthUser = async (req: any, res: Response) => {
  try {
    const user = req.user;

    const hotels = await UserHotel.find({ user: user.id })
      .populate("hotel")
      .select("hotel");

    res
      .status(200)
      .json({ message: "Hotels fetched", data: hotels, success: true });
  } catch (error: any) {
    res.status(500).json({ message: error?.message, success: false });
  }
};

export const getHotelDetails = async (req: any, res: Response) => {
  try {
    const user = req.user;
    const hotelId = req.params.id;

    const hotel = await UserHotel.findOne({
      hotel: hotelId,
      user: user.id,
    })
      .populate("hotel")
      .select("hotel");

    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Hotel fetched", data: hotel, success: true });
  } catch (error: any) {
    res.status(500).json({ message: error?.message, success: false });
  }
};

export const updateHotelDetails = async (req: any, res: Response) => {
  try {
    const user = req.user;
    const hotelId = req.params.id;
    const body = req.body;

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: hotelId,
        "users.user": user.id,
      },
      {
        $set: body,
      },
      { new: true }
    );

    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found", success: false });
    }

    res.status(200).json({ message: "Hotel details updated", success: true });
  } catch (error: any) {
    res.status(500).json({ message: error?.message, success: false });
  }
};

export const getUsersListOfHotel = async (req: any, res: Response) => {
  try {
    const user = req.user;

    // Find users only if requesting user present in users list and is ADMIN or BOT

    const hotel = await Hotel.findOne({
      "users.user": user.id,
      $or: [{ "users.role": "ADMIN" }, { "users.role": "BOT" }],
    }).populate("users.user");

    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found", success: false });
    }

    const usersList = hotel.users.filter((user: any) => user.role !== "BOT");

    res
      .status(200)
      .json({ message: "Users list fetched", data: usersList, success: true });
  } catch (error: any) {
    res.status(500).json({ message: error?.message, success: false });
  }
};

export const createHotel = async (req: any, res: Response) => {
  try {
    const { name } = req.body;

    const isHotelExists = await Hotel.findOne({ name: name.toLowerCase() });

    if (isHotelExists) {
      return res
        .status(400)
        .json({ message: "Hotel already exists", success: false });
    }

    const hotel = new Hotel({
      name: name.toLowerCase(),
    });

    const newHotel = await hotel.save();

    const isBOTAvailable = await User.findOne({ email: process.env.BOT_EMAIL });

    const hashedPassword = await bcrypt.hash(process.env.BOT_PASSWORD!, 10);

    if (!isBOTAvailable) {
      const newUser = new User({
        name: "BOT",
        email: process.env.BOT_EMAIL,
        password: hashedPassword,
      });
      const botUser = await newUser.save();

      const userHotel = new UserHotel({
        role: "BOT",
        user: botUser._id,
        hotel: newHotel._id,
      });

      const newUserHotel = await userHotel.save();

      newHotel.users.push(newUserHotel._id);
    } else {
      const userHotel = new UserHotel({
        role: "BOT",
        user: isBOTAvailable._id,
        hotel: newHotel._id,
      });

      const newUserHotel = await userHotel.save();

      newHotel.users.push(newUserHotel._id);
    }

    await newHotel.save();

    res.status(201).json({ message: "Hotel created", success: true });
  } catch (error: any) {
    res.status(500).json({ message: error?.message, success: false });
  }
};
