import express from "express"
import { createProduct, deleteProduct, editProduct, getAllProducts, getCategories } from "../AdminController/AdminProductController.js"
import imageUploadMiddleware from "../../Middleware/imageUplaod.middlware.js"
import validateProductFields from "../../Middleware/validateProductFeilds.js"

const AdminProductRoute = express.Router()


AdminProductRoute.get("/",getAllProducts)
AdminProductRoute.get("/categories",getCategories)
AdminProductRoute.post("/", imageUploadMiddleware, validateProductFields,  createProduct)
AdminProductRoute.put("/:id", imageUploadMiddleware, validateProductFields,  editProduct)
AdminProductRoute.delete("/:id", deleteProduct)

export default AdminProductRoute