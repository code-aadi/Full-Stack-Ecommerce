import express from "express"
import { getUserDetails, getUsers, updateUserRole } from "../AdminController/AdminUserController.js"

const AdminUserRoutes = express.Router()

AdminUserRoutes.get("/", getUsers)
AdminUserRoutes.get("/:id", getUserDetails)
AdminUserRoutes.patch("/:id", updateUserRole)

export default AdminUserRoutes