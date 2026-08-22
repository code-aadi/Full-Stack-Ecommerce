
import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true }, // plain token kabhi store mat karo
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  familyId: { type: String, required: true }, // pura chain ek family se belong karta hai
  revoked: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken