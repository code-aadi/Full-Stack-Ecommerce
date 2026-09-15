import express from "express"
import { adminDashboard } from "../AdminController/AdminDashboardController.js"
import authMiddleware from "../../Middleware/auth.middleware.js"
import { isAdmin } from "../../Middleware/admin.middleware.js"

const AdminDashboardRoutes = express.Router()

AdminDashboardRoutes.get("/", authMiddleware, isAdmin, adminDashboard)

export default AdminDashboardRoutes