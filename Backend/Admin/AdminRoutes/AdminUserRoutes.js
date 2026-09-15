import express from "express"
import { getUserDetails, getUsers } from "../AdminController/AdminUserController.js"
import { updateUserRole } from "../AdminController/AdminUserUpdateController.js"
import authMiddleware from "../../Middleware/auth.middleware.js"
import { isAdmin, isSuperAdmin } from "../../Middleware/admin.middleware.js"

const AdminUserRoutes = express.Router()

AdminUserRoutes.get("/", authMiddleware, isAdmin, getUsers)
AdminUserRoutes.get("/:id", authMiddleware, isAdmin, getUserDetails)
AdminUserRoutes.patch("/:id", authMiddleware, isAdmin, isSuperAdmin,  updateUserRole)

export default AdminUserRoutes