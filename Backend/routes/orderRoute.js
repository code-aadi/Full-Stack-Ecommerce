import express from "express"
import orders, { getOrderDetails, getOrders } from "../Controller/OrderController.js"
import addressValidation from "../Middleware/adressValidation.middleware.js"
import authMiddleware from "../Middleware/auth.middleware.js"

const orderRouter = express.Router()


orderRouter.post("/",authMiddleware, addressValidation, orders)
orderRouter.get("/userOrder", authMiddleware, getOrders)
orderRouter.get("/:id", authMiddleware, getOrderDetails)

export default orderRouter