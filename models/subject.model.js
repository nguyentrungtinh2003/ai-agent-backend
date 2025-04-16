import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    documents: [{ type: mongoose.Schema.ObjectId, ref: "Document" }],
  },
  { timestamps: true }
);

export default mongoose.model("Subject", SubjectSchema);
