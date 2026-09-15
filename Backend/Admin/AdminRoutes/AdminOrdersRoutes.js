import express from "express"
import { getOrderDetails, getOrders, updateOrderStatus } from "../AdminController/AdminOrderController.js"
import authMiddleware from "../../Middleware/auth.middleware.js"
import { isAdmin } from "../../Middleware/admin.middleware.js"

const AdminOrderRoute = express.Router()

AdminOrderRoute.get("/", authMiddleware, isAdmin ,getOrders)
AdminOrderRoute.get("/:orderId",authMiddleware, isAdmin, getOrderDetails)
AdminOrderRoute.patch("/:orderId",authMiddleware, isAdmin,  updateOrderStatus)

export default AdminOrderRoute