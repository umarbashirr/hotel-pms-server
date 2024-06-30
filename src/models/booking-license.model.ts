import mongoose from "mongoose";

interface IBookingLicense extends mongoose.Document {
  primaryGuest: mongoose.Schema.Types.ObjectId;
  booker: mongoose.Schema.Types.ObjectId; //Can be Individual or Company
  hotel: mongoose.Schema.Types.ObjectId;
  product: {
    productType: string;
    category: mongoose.Schema.Types.ObjectId;
    count: number;
  };
  dateRange: {
    checkIn: Date;
    checkOut: Date;
  };
  amount: {
    basePrice: number;
    taxAmount: number;
    discountAmount: number;
    finalAmount: number;
  };
  fullfillment: {
    status: string;
    room: mongoose.Schema.Types.ObjectId;
    fullfilledBy: mongoose.Schema.Types.ObjectId;
    fullfilled_guests: [
      {
        guest: mongoose.Schema.Types.ObjectId;
        isPrimaryGuest: boolean;
      }
    ];
    fullfilledAt: Date;
  };
  extraInfo: {
    totalGuests: number;
    totalPax: number;
    totalChildren: number;
    notes: string;
  };
}

type BookingLicenseModel = mongoose.Model<IBookingLicense>;

const bookingLicenseSchema = new mongoose.Schema<
  IBookingLicense,
  BookingLicenseModel
>(
  {
    primaryGuest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IndividualProfile",
    },
    // Booker can be Individual or Company
    booker: {
      customerDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualProfile",
      },
      selfDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyProfile",
      },
    },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    product: {
      productType: {
        type: String,
        enum: ["ROOM", "OOO", "ADDON"],
        required: true,
      },
      category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      count: { type: Number, required: true, default: 1 },
    },
    dateRange: {
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
    },
    amount: {
      basePrice: { type: Number },
      taxAmount: { type: Number },
      discountAmount: { type: Number },
      finalAmount: { type: Number },
    },
    fullfillment: {
      status: {
        type: String,
        required: true,
        enum: [
          "FULLFILLMENT_PENDING",
          "FULLFILLMENT_STARTED",
          "FULLFILLMENT_COMPLETED",
          "FULLFILLMENT_COMPLETED",
        ],
      },
      room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      fullfilledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "INDIVIDUAL_PROFILE",
      },
      fullfilled_guests: [
        {
          guest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IndividualProfile",
          },
          isPrimaryGuest: { type: Boolean },
        },
      ],
      fullfilledAt: { type: Date },
    },
    extraInfo: {
      totalGuests: { type: Number },
      totalPax: { type: Number },
      totalChildren: { type: Number },
      notes: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const BookingLicense = mongoose.model<IBookingLicense, BookingLicenseModel>(
  "BookingLicense",
  bookingLicenseSchema
);

export default BookingLicense;
