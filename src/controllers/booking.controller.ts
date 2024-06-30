import { Request, Response } from "express";
import BookingLicense from "../models/booking-license.model";
import Booking from "../models/booking.model";
import moment from "moment";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const propertyId = req.query.propertyId as string;

    if (!propertyId) {
      return res.status(400).json({
        message: "Property ID is required",
        success: false,
      });
    }

    const {
      masterGuestList,
      primaryGuest,
      payType,
      paymentDetails,
      bookerDetails,
      products,
      bookingSource,
      bookingStatus,
    } = req.body;

    if (masterGuestList.length === 0) {
      return res.status(400).json({
        message: "Minimum one guest is required",
        success: false,
      });
    }

    if (!primaryGuest) {
      return res.status(400).json({
        message: "Primary guest is required",
        success: false,
      });
    }

    if (!payType) {
      return res.status(400).json({
        message: "Payment type is required",
        success: false,
      });
    }

    if (!bookingSource) {
      return res.status(400).json({
        message: "Booking source is required",
        success: false,
      });
    }

    if (!bookingStatus) {
      return res.status(400).json({
        message: "Booking status is required",
        success: false,
      });
    }

    let createdLicenses: any[] = [];

    if (products && products.length > 0) {
      const licensePromises = products.map(async (product: any) => {
        const bookingLicense = await BookingLicense.create({
          primaryGuest,
          booker:
            bookerDetails?.type === "INDIVIDUAL"
              ? { customerDetails: bookerDetails._id }
              : { selfDetails: bookerDetails._id },
          hotel: propertyId,
          product: {
            productType: product.productType,
            category: product.category,
            count: product.count,
          },
          dateRange: {
            checkIn: moment(product.dateRange.checkIn, "DD-MM-YYYY").toDate(),
            checkOut: moment(product.dateRange.checkOut, "DD-MM-YYYY").toDate(),
          },
          amount: {
            basePrice: product.amount.basePrice,
            taxAmount: product.amount.taxAmount,
            discountAmount: product.amount.discountAmount,
            finalAmount: product.amount.finalAmount,
          },
          extraInfo: {
            totalGuests: product.extraInfo.totalGuests,
            totalPax: product.extraInfo.totalPax,
            totalChildren: product.extraInfo.totalChildren,
            notes: product.extraInfo.notes,
          },
        });

        return bookingLicense.save();
      });

      createdLicenses = await Promise.all(licensePromises);
    }

    const booking = await Booking.create({
      hotel: propertyId,
      primaryGuest,
      masterGuestList,
      payType,
      paymentDetails,
      bookingSource,
      bookingStatus,
      products: createdLicenses,
    });

    const newBooking = await booking.save();

    return res.status(201).json({
      message: "Booking created successfully",
      data: newBooking,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error?.message, success: false });
  }
};
