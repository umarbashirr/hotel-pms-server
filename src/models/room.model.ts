import mongoose from "mongoose";

interface IRoom extends mongoose.Document {
  name: string;
  code: string;
  hotel: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
}

type RoomModel = mongoose.Model<IRoom>;

const roomSchema = new mongoose.Schema<IRoom, RoomModel>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room =
  mongoose.models.Room || mongoose.model<IRoom, RoomModel>("Room", roomSchema);

export default Room;
