import mongoose from "mongoose";
import { addressSchema, gstSchema } from "./schema.model";

interface IHotel extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  website: string;
  mapURL: string;
  ownerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  gstDetails: {
    beneficiary: string;
    gstin: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
  };
  users: mongoose.Schema.Types.ObjectId[];
  createdBy: mongoose.Schema.Types.ObjectId;
}

const userAccessSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: [
        "BOT",
        "ADMIN",
        "FRONT_OFFICE",
        "HOTEL_MANAGER",
        "RESTAURANT_MANAGER",
        "RESERVATION_MANAGER",
      ],
      default: "FRONT_OFFICE",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: false }
);

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const hotelSchema = new mongoose.Schema<IHotel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: addressSchema,
    website: {
      type: String,
    },
    mapURL: {
      type: String,
    },
    ownerDetails: ownerSchema,
    gstDetails: gstSchema,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserHotel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hotel =
  mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", hotelSchema);

export default Hotel;
