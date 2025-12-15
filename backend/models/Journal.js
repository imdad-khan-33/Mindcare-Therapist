import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    content: String,
    mood: String,
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Journal", JournalSchema);
