import express from "express"
import { getOrderDetails, getOrders, updateOrderStatus } from "../AdminController/AdminOrderController.js"

const AdminOrderRoute = express.Router()

AdminOrderRoute.get("/",getOrders)
AdminOrderRoute.get("/:orderId", getOrderDetails)
AdminOrderRoute.patch("/:orderId", updateOrderStatus)

export default AdminOrderRoute