import mongoose from "mongoose";

export const gstSchema = new mongoose.Schema(
  {
    beneficiary: {
      type: String,
    },
    gstin: {
      type: String,
    },
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

export const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

export const amountSchema = new mongoose.Schema(
  {
    basePrice: {
      type: Number,
    },
    taxAmount: {
      type: Number,
    },
    discountAmount: {
      type: Number,
    },
    finalAmount: {
      type: Number,
    },
  },
  { _id: false }
);
