import mongoose from "mongoose";

export interface IUserHotel extends mongoose.Document {
  role: string;
  user: mongoose.Schema.Types.ObjectId;
  hotel: mongoose.Schema.Types.ObjectId;
}

type UserHotelModel = mongoose.Model<IUserHotel>;

const userHotelSchema = new mongoose.Schema<IUserHotel, UserHotelModel>(
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
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
  },
  { timestamps: true }
);

const UserHotel = mongoose.model<IUserHotel, UserHotelModel>(
  "UserHotel",
  userHotelSchema
);

export default UserHotel;
