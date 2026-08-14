import express from "express"
import {  getCurrentUser, login, logout, refreshAccessToken, register } from "../Controller/Users.js"
import registerValidation from "../Middleware/validate.middleware.js"
import authMiddleware from "../Middleware/auth.middleware.js"

const userRouter = express.Router()

userRouter.post("/login", login)
userRouter.post("/register", registerValidation ,register)
userRouter.get("/me", authMiddleware ,getCurrentUser)
userRouter.post("/refresh", refreshAccessToken)
userRouter.post("/logout", logout)

export default userRouter