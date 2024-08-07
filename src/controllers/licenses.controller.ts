import { Request, Response } from "express";
import BookingLicense from "../models/booking-license.model";
import moment from "moment";
import { getLicensesByHotelAndDate } from "../helpers/licenseHelper";

export const getLicenses = async (req: Request, res: Response) => {
  try {
    const body: any = req.query;

    if (!body?.propertyId) {
      return res.status(400).json({
        message: "Property ID is required",
        success: false,
      });
    }

    if (!body?.fromDate) {
      return res.status(400).json({
        message: "From date is required",
        success: false,
      });
    }

    if (!body?.toDate) {
      return res.status(400).json({
        message: "To date is required",
        success: false,
      });
    }

    const from = moment(body.fromDate, "DD-MM-YYYY").startOf("day").toDate();
    const to = moment(body.toDate, "DD-MM-YYYY").startOf("day").toDate();

    const licenses = await getLicensesByHotelAndDate(body.propertyId, to, from);

    return res.status(200).json({
      message: "Licenses fetched successfully",
      success: true,
      data: licenses,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
      success: false,
    });
  }
};
