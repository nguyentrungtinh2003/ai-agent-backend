import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    documentId: { type: mongoose.Schema.ObjectId, ref: "Document" },
    content: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("feedback", FeedbackSchema);
