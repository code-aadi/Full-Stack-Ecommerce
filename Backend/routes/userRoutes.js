import express from "express"
import {  getCurrentUser, login, logout, refreshAccessToken, register } from "../Controller/Users.js"
import registerValidation from "../Middleware/validate.middleware.js"
import authMiddleware from "../Middleware/auth.middleware.js"
import { forgotPassword, resetPassword, verifyToken } from "../Controller/ForgotPasswordController.js"
import { authLimiter, forgotPasswordLimiter } from "../utils/RateLimit.js"

const userRouter = express.Router()

userRouter.post("/login", authLimiter, login)
userRouter.post("/register", authLimiter,  registerValidation ,register)
userRouter.get("/me", authMiddleware ,getCurrentUser)
userRouter.post("/refresh", refreshAccessToken)
userRouter.post("/logout", logout)
userRouter.post("/forgot-password", forgotPasswordLimiter, forgotPassword)
userRouter.post("/reset-password/:token", forgotPasswordLimiter, resetPassword)
userRouter.get('/verify-token/:token', verifyToken)

export default userRouter