import express from "express"
import {  getCurrentUser, login, logout, refreshAccessToken, register } from "../Controller/Users.js"
import registerValidation from "../Middleware/validate.middleware.js"
import authMiddleware from "../Middleware/auth.middleware.js"
import { forgotPassword, resetPassword, verifyToken } from "../Controller/ForgotPasswordController.js"

const userRouter = express.Router()

userRouter.post("/login", login)
userRouter.post("/register", registerValidation ,register)
userRouter.get("/me", authMiddleware ,getCurrentUser)
userRouter.post("/refresh", refreshAccessToken)
userRouter.post("/logout", logout)
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password/:token", resetPassword)
userRouter.get('/verify-token/:token', verifyToken)

export default userRouter