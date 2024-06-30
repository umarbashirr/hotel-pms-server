import mongoose from "mongoose";

interface IIndividualProfile extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  verificationDetails: {
    idType?: string;
    idNumber?: string;
    idFront?: string;
    idBack?: string;
    placeOfIssue?: string;
    dateOfIssue?: string;
    expiryDate?: string;
  };
  notes?: string;
  isSuspended?: boolean;
  hotel: mongoose.Schema.Types.ObjectId;
}

type IndividualModel = mongoose.Model<IIndividualProfile>;

const individualSchema = new mongoose.Schema<
  IIndividualProfile,
  IndividualModel
>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    dob: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
    verificationDetails: {
      idType: { type: String },
      idNumber: { type: String },
      idFront: { type: String },
      idBack: { type: String },
      placeOfIssue: { type: String },
      dateOfIssue: { type: String },
      expiryDate: { type: String },
    },
    notes: { type: String },
    isSuspended: { type: Boolean, default: false },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const IndividualProfile = mongoose.model<IIndividualProfile, IndividualModel>(
  "IndividualProfile",
  individualSchema
);

export default IndividualProfile;
