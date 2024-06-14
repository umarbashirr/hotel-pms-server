import mongoose from "mongoose";
import { addressSchema } from "./schema.model";

interface IProfile extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  DOB: Date;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  verificationID: {
    type: string;
    number: string;
    placeOfIssue: string;
    dateOfIssue: Date;
    dateOfExpiry: Date;
  };
  isVerified: boolean;
  notes: string;
  isSuspended: boolean;
}

const IDSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    number: {
      type: String,
    },
    placeOfIssue: {
      type: String,
    },
    dateOfIssue: {
      type: Date,
    },
    dateOfExpiry: {
      type: Date,
    },
  },
  {
    _id: false,
  }
);

const profileSchema = new mongoose.Schema<IProfile>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
    },
    address: addressSchema,
    verificationID: IDSchema,
    isVerified: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Profile =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
