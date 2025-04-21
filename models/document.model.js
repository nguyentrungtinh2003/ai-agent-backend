import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    lecturers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    subjects: [{ type: mongoose.Schema.ObjectId, ref: "Subject" }],
    feedbacks: [{ type: mongoose.Schema.ObjectId, ref: "Feedback" }],
  },
  { timestamps: true }
);

export default mongoose.model("document", DocumentSchema);
