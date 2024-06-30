import { Request, Response } from "express";
import IndividualProfile from "../models/individual-profile.model";

export const createIndividualProfile = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { propertyId } = req.query;

    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.phone ||
      !body.phone
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const profile = await IndividualProfile.findOne({
      email: body.email,
      hotel: propertyId,
    });

    if (profile) {
      return res
        .status(400)
        .json({ message: "Profile already exists", success: false });
    }

    const newProfile = new IndividualProfile({ ...body, hotel: propertyId });

    await newProfile.save();

    res.status(201).json({ message: "Profile created", success: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message, success: false });
  }
};
