import mongoose from "mongoose"

const SessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    therapist: String,
    date: Date,
    duration: Number,
    type: String,
    notes: String,
    status: { type: String, default: "scheduled" },
  },
  { timestamps: true },
)

export default mongoose.model("Session", SessionSchema)
