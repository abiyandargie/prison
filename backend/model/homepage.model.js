import mongoose from "mongoose";

const homepageMessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Store the image URL or file path
      required: false, // Optional field
    },
  },
  { timestamps: true }
);

export const HomepageMessage = mongoose.model("HomepageMessage", homepageMessageSchema);
