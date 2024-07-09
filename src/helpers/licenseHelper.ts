import BookingLicense from "../models/booking-license.model";

export const getLicensesByHotelAndDate = async (
  propertyId: string,
  to: Date,
  from: Date
) => {
  return await BookingLicense.find({
    hotel: propertyId,
    $or: [
      {
        $and: [
          { "dateRange.checkIn": { $lte: to } },
          { "dateRange.checkOut": { $gte: from } },
        ],
      },
      {
        $and: [
          { "dateRange.checkIn": { $lte: from } },
          { "dateRange.checkOut": { $gte: to } },
        ],
      },
    ],
  })
    .populate("primaryGuest")
    .populate("booker.customerDetails")
    .populate("booker.selfDetails")
    .populate("hotel")
    .populate("product.category")
    .populate("fullfillment.room")
    .populate("fullfillment.fullfilledBy");
};
