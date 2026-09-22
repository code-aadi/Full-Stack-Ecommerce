import express from "express"
import {  getCheapProducts, getProductsByCategory, getProductsById, getTopProducts, searchProducts } from "../Controller/productController.js"
import { searchLimiter } from "../utils/RateLimit.js"
const productRouter = express.Router()


productRouter.get("/category/:category", getProductsByCategory)
productRouter.get("/id/:id", getProductsById)
productRouter.get("/cheap", getCheapProducts)
productRouter.get("/topProducts", getTopProducts)
productRouter.get("/search", searchLimiter, searchProducts)



export default productRouter