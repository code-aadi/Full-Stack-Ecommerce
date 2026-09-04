import express from "express"
import createPaymentOrder from "../Controller/PaymentController.js"
import addressValidation from "../Middleware/adressValidation.middleware.js"
import authMiddleware from "../Middleware/auth.middleware.js"

const paymentRouter = express.Router()

paymentRouter.post("/",authMiddleware, addressValidation, createPaymentOrder)

export default paymentRouter