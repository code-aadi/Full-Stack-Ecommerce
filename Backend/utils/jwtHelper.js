// utils/token.js
import jwt from "jsonwebtoken";
import crypto from "crypto";
import RefreshToken from "../Model/RefreshToken.js";
import { hashToken } from "./tokenHash.js";

export function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
}

// naya helper - refresh token banata hai AUR DB me record bhi karta hai
export async function generateRefreshToken(userId, familyId = null) {
  const finalFamilyId = familyId || crypto.randomUUID();

  const refreshToken = jwt.sign(
    { userId, familyId: finalFamilyId },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  await RefreshToken.create({
    tokenHash: hashToken(refreshToken),
    userId,
    familyId: finalFamilyId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return refreshToken;
}