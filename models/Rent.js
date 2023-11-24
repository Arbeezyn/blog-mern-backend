import mongoose, { mongo } from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rent", rentSchema);
