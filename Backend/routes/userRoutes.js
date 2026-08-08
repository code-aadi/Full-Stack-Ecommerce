import express from "express"
import { login, register } from "../Controller/Users.js"
import registerValidation from "../Middleware/validate.middleware.js"

const userRouter = express.Router()

userRouter.get("/login", login)
userRouter.post("/register", registerValidation ,register)


export default userRouter