import mongoose from "mongoose";
import { gstSchema } from "./schema.model";

interface ICompanyProfile extends mongoose.Document {
  companyName: string;
  companyEmail: string;
  companyPhone?: string;
  companyCode?: string;
  officeAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  companyGST: {
    beneficiary?: string;
    gstin?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  verificationDetails: {
    regNumber?: string;
    regCert?: string;
    regDate?: string;
    regCountry?: string;
  };
  notes?: string;
  isSuspended?: boolean;
  hotel: mongoose.Schema.Types.ObjectId;
}

type CompanyModel = mongoose.Model<ICompanyProfile>;

const companyProfileSchema = new mongoose.Schema<ICompanyProfile, CompanyModel>(
  {
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyPhone: { type: String },
    companyCode: { type: String },
    officeAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
    billingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
    companyGST: gstSchema,
    verificationDetails: {
      regNumber: { type: String },
      regCert: { type: String },
      regDate: { type: String },
      regCountry: { type: String },
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

const CompanyProfile = mongoose.model<ICompanyProfile, CompanyModel>(
  "CompanyProfile",
  companyProfileSchema
);

export default CompanyProfile;
