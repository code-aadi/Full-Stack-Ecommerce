import express from "express"
import { addToCart, clearCart, getCarts, removeFromCart, updateQuantity } from "../Controller/cartController.js"
import authMiddleware from "../Middleware/auth.middleware.js"

const cartRouter = express.Router()

cartRouter.post("/add", authMiddleware,  addToCart)
cartRouter.get("/get",authMiddleware, getCarts)

cartRouter.patch("/quantity",authMiddleware, updateQuantity)

cartRouter.delete("/removeCart", authMiddleware, clearCart)
cartRouter.delete("/:productId", authMiddleware, removeFromCart)


export default cartRouter