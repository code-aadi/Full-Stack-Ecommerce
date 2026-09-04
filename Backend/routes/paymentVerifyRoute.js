import express from "express"
import paymentVerify from "../Controller/paymentVerify.js"
import authMiddleware from "../Middleware/auth.middleware.js"

const payementVerifyRoute = express.Router()

payementVerifyRoute.post("/", authMiddleware, paymentVerify)

export default payementVerifyRoute