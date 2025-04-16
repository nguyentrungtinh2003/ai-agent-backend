import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    imgUrl: { type: String },
    birthDay: { type: Date },
    role: { type: String, enum: ["ADMIN", "LECTURER"], required: true },
    subjects: [{ type: mongoose.Schema.ObjectId, ref: "Subject" }],
    documents: [{ type: mongoose.Schema.ObjectId, ref: "Document" }],
    feedbacks: [{ type: mongoose.Schema.ObjectId, ref: "Feedback" }],
    resetOTP: { type: String },
    otpExpire: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
