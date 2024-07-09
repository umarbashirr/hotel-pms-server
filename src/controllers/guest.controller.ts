import { Request, Response } from "express";
import moment from "moment";
import { getLicensesByHotelAndDate } from "../helpers/licenseHelper";
import { FULLFILLMENT_ENUM } from "../enums/fullfillment";

export const getAllCurrentBookedGuests = async (
  req: Request,
  res: Response
) => {
  try {
    const { propertyId, startDate, endDate }: any = req.query;

    if (!propertyId) {
      return res.status(400).json({
        message: "Property ID is required",
        success: false,
      });
    }

    if (!startDate) {
      return res.status(400).json({
        message: "From date is required",
        success: false,
      });
    }

    if (!endDate) {
      return res.status(400).json({
        message: "To date is required",
        success: false,
      });
    }

    const from = moment(startDate, "DD-MM-YYYY").startOf("day").toDate();
    const to = moment(endDate, "DD-MM-YYYY").startOf("day").toDate();

    const licenses = await getLicensesByHotelAndDate(propertyId, to, from);

    let guests: any = [];

    licenses.map((license: any) => {
      if (
        license.fullfillment.status === FULLFILLMENT_ENUM.FULLFILLMENT_PENDING
      ) {
        guests.push(license.primaryGuest);
      } else {
        guests.push(license?.fullfillment?.fullfilled_guests?.guest);
      }
    });

    return res.status(200).json({
      message: "Guests fetched successfully",
      success: true,
      data: guests,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message,
      success: false,
    });
  }
};
