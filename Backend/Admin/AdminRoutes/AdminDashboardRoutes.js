import express from "express"
import { adminDashboard } from "../AdminController/AdminDashboardController.js"

const AdminDashboardRoutes = express.Router()

AdminDashboardRoutes.get("/", adminDashboard)

export default AdminDashboardRoutes