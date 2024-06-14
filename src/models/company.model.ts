import mongoose from "mongoose";
import { addressSchema, gstSchema } from "./schema.model";

interface ICompany extends mongoose.Document {
  name: string;
  phone: string;
  email: string;
  contactPerson: mongoose.Schema.Types.ObjectId;
  gst: {
    beneficiary: string;
    gstin: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
  };
  officeAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

const companySchema = new mongoose.Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },

    gst: gstSchema,

    officeAddress: addressSchema,

    billingAddress: addressSchema,
  },
  {
    timestamps: true,
  }
);

const Company =
  mongoose.models.Company || mongoose.model<ICompany>("Company", companySchema);

export default Company;
