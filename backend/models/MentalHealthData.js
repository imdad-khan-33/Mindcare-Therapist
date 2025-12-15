import mongoose from "mongoose";

const MentalHealthDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stressLevel: {
      type: String,
      enum: ["Low", "Moderate", "High", "Very High"],
      default: "Low",
    },
    anxietyScore: {
      type: String,
      enum: ["Low", "Moderate", "High", "Severe"],
      default: "Moderate",
    },
    moodScore: {
      type: Number,
      min: 1,
      max: 10,
      default: 7,
    },
    currentStatus: {
      type: String,
      enum: ["Balanced", "Stressed", "Anxious", "Happy", "Sad"],
      default: "Balanced",
    },
  },
  { timestamps: true }
);

export default mongoose.model("MentalHealthData", MentalHealthDataSchema);
