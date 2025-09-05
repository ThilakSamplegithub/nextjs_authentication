import { connect } from "@/dbConfig/dbConfig.ts";
import mongoose from "mongoose";


connect();

const userSchema = new mongoose.Schema({
  userName: { required: [true, "username is must"], type: String },
  password: { required: [true, "Password is must"], type: String },
  email: {
    required: [true, "Email must be present"],
    type: String,
    unique: true,
  },
  verifyToken: { type: String, default: "" },
  verifyTokenExpiry: { type: Date, default: Date.now() + 7200000 },
  isVerified: { type: Boolean, default: false },
  forgotPasswordToken: { type: String, default: "" },
  forgotPasswordTokenExpiry: { type: Date, default: Date.now() + 7200000 },
});
export const User = mongoose.models.USER || mongoose.model("USER", userSchema);
