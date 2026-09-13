import express from "express"
import { createProduct, deleteProduct, editProduct, getAllProducts, getCategories, productDetail, updateProductStatus, updateStock } from "../AdminController/AdminProductController.js"
import imageUploadMiddleware from "../../Middleware/imageUplaod.middlware.js"
import validateProductFields from "../../Middleware/validateProductFeilds.js"

const AdminProductRoute = express.Router()


AdminProductRoute.get("/",getAllProducts)
AdminProductRoute.get("/categories",getCategories)
AdminProductRoute.post("/", imageUploadMiddleware, validateProductFields,  createProduct)
AdminProductRoute.put("/:id", imageUploadMiddleware, validateProductFields,  editProduct)
AdminProductRoute.delete("/:id", deleteProduct)
AdminProductRoute.get("/:id", productDetail)
AdminProductRoute.patch("/:id/stock", updateStock)
AdminProductRoute.patch("/:id/status", updateProductStatus)

export default AdminProductRoute