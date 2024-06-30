import mongoose from "mongoose";

interface IBooking extends mongoose.Document {
  hotel: mongoose.Schema.Types.ObjectId;
  masterGuestList: [
    {
      guest: mongoose.Schema.Types.ObjectId;
      isPrimaryGuest: boolean;
    }
  ];
  payType: string;
  paymentDetails: [
    {
      amount: number;
      paymentDate: Date;
      paymentType: string;
      paymentStatus: string;
      transactionId: string;
    }
  ];
  bookingSource: string;
  bookingStatus: string;
  gstOtherThanBooker: {
    gstBeneficiary: string;
    gstin: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
  };
  products: mongoose.Schema.Types.ObjectId[];
  invoiceComment: string;
}

type BookingModel = mongoose.Model<IBooking>;

const bookingSchema = new mongoose.Schema<IBooking, BookingModel>(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    masterGuestList: [
      {
        guest: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "IndividualProfile",
        },
        isPrimaryGuest: { type: Boolean, default: false },
      },
    ],
    payType: {
      type: String,
      required: true,
    },
    paymentDetails: [
      {
        amount: { type: Number, required: true },
        paymentDate: { type: Date, required: true },
        paymentType: { type: String, required: true },
        paymentStatus: { type: String, required: true },
        transactionId: { type: String, required: true },
      },
    ],
    bookingSource: {
      type: String,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
    },
    gstOtherThanBooker: {
      gstBeneficiary: { type: String },
      gstin: { type: String },
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingLicense",
      },
    ],
    invoiceComment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model<IBooking, BookingModel>(
  "Booking",
  bookingSchema
);

export default Booking;
