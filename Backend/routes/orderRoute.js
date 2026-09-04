import express from "express"
import orders from "../Controller/OrderController.js"
import addressValidation from "../Middleware/adressValidation.middleware.js"
import authMiddleware from "../Middleware/auth.middleware.js"

const orderRouter = express.Router()


orderRouter.post("/",authMiddleware, addressValidation, orders)

export default orderRouter