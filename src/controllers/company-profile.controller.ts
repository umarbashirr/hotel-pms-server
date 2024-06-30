import { Request, Response } from "express";
import CompanyProfile from "../models/company-profile.model";

export const createCompanyProfile = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { propertyId } = req.query;

    if (!body.companyName || !body.companyEmail || !body.companyPhone) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const profile = await CompanyProfile.findOne({
      email: body.companyEmail,
      hotel: propertyId,
    });

    if (profile) {
      return res
        .status(400)
        .json({ message: "Profile already exists", success: false });
    }

    const newProfile = new CompanyProfile({ ...body, hotel: propertyId });

    await newProfile.save();

    res.status(201).json({ message: "Profile created", success: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message, success: false });
  }
};
