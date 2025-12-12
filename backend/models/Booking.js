import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    concern: {
      type: String,
      required: true,
      enum: ["anxiety", "depression", "trauma", "relationships", "other"],
    },
    preferredTime: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening"],
    },
    therapist: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      specialization: { type: String, required: true },
      fees: { type: String, required: true },
      rating: { type: Number },
      experience: { type: String },
    },
    // If auth is present, optionally link to user
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "confirmed", "cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
