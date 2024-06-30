import { Request, Response } from "express";
import Room from "../models/room.model";
import BookingLicense from "../models/booking-license.model";
import Category from "../models/category.model";
import mongoose from "mongoose";

export const getHotelOccupancy = async (req: Request, res: Response) => {
  try {
    const { checkIn, checkOut, propertyId } = req.query;

    if (!checkIn || !checkOut || !propertyId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const checkInDate = new Date(checkIn as string);
    const checkOutDate = new Date(checkOut as string);

    // Get all categories for the given property
    const categories = await Category.find({ hotel: propertyId });

    // Generate an array of dates between checkIn and checkOut
    const dates = getDatesInRange(checkInDate, checkOutDate);

    // Initialize availability array
    const availability = [];

    for (const date of dates) {
      const formattedDate = date.toISOString().split("T")[0];
      const dateAvailability: { [key: string]: { [key: string]: number } } = {
        [formattedDate]: {},
      };

      for (const category of categories) {
        // Assume we have a way to get total rooms for each category
        const totalRooms = await getTotalRoomsForCategory(category._id);

        // Count booked rooms for this category and date
        const bookedRooms = await BookingLicense.aggregate([
          {
            $match: {
              hotel: new mongoose.Types.ObjectId(propertyId as string),
              "product.category": category._id,
              "dateRange.checkIn": { $lte: date },
              "dateRange.checkOut": { $gt: date },
            },
          },
          {
            $group: {
              _id: null,
              totalBooked: { $sum: "$product.count" },
            },
          },
        ]);

        const totalBooked =
          bookedRooms.length > 0 ? bookedRooms[0].totalBooked : 0;

        // Calculate vacant rooms
        const vacantRooms = totalRooms - totalBooked;
        dateAvailability[formattedDate][category.name] = vacantRooms;
      }

      availability.push(dateAvailability);
    }

    res.json(availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to generate an array of dates between two dates
function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

async function getTotalRoomsForCategory(
  categoryId: mongoose.Types.ObjectId
): Promise<number> {
  // This is a placeholder. You need to implement this based on your data model
  // For example, you might have a 'totalRooms' field in your Category model
  const category = await Room.find({
    category: categoryId,
  }).countDocuments();
  return category || 0;
}
