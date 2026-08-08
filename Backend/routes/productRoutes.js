import express from "express"
import { getCartData, getCheapProducts, getProducts, getProductsByCategory, getProductsById, getTopProducts, searchProducts } from "../Controller/productController.js"
const productRouter = express.Router()

productRouter.get("/", getProducts)
productRouter.get("/category/:category", getProductsByCategory)
productRouter.get("/id/:id", getProductsById)
productRouter.get("/cheap", getCheapProducts)
productRouter.get("/topProducts", getTopProducts)
productRouter.get("/search", searchProducts)
productRouter.post("/cart",getCartData)



export default productRouter