import express from "express"
import { createProduct, deleteProduct, editProduct, getAllProducts, getCategories, productDetail, updateProductStatus, updateStock } from "../AdminController/AdminProductController.js"
import imageUploadMiddleware from "../../Middleware/imageUplaod.middlware.js"
import validateProductFields from "../../Middleware/validateProductFeilds.js"
import authMiddleware from "../../Middleware/auth.middleware.js"
import { isAdmin } from "../../Middleware/admin.middleware.js"

const AdminProductRoute = express.Router()


AdminProductRoute.get("/", authMiddleware, isAdmin ,getAllProducts)
AdminProductRoute.get("/categories", authMiddleware, isAdmin, getCategories)
AdminProductRoute.post("/", authMiddleware, isAdmin, imageUploadMiddleware, validateProductFields,  createProduct)
AdminProductRoute.put("/:id", authMiddleware, isAdmin, imageUploadMiddleware, validateProductFields,  editProduct)
AdminProductRoute.delete("/:id",authMiddleware, isAdmin, deleteProduct)
AdminProductRoute.get("/:id", authMiddleware, isAdmin, productDetail)
AdminProductRoute.patch("/:id/stock", authMiddleware, isAdmin, updateStock)
AdminProductRoute.patch("/:id/status", authMiddleware, isAdmin, updateProductStatus)

export default AdminProductRoute