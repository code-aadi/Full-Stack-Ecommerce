import "dotenv/config"
import express from "express"
import productRouter from "./routes/productRoutes.js"
import connectDB from "./database.js"
import cors from "cors"
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import cartRouter from "./routes/cartRoutes.js"
import checkoutRouter from "./routes/checkoutRoute.js"
import orderRouter from "./routes/orderRoute.js"
import paymentRouter from "./routes/paymentRouter.js"
import payementVerifyRoute from "./routes/paymentVerifyRoute.js"
const app = express()
connectDB()

app.use(express.json())

app.use(cookieParser())

app.use(cors({origin : "http://localhost:5173", credentials : true}))

app.use("/api/products", productRouter);

app.use("/api/auth", userRouter )
app.use("/api/cart", cartRouter)
app.use("/api/checkout", checkoutRouter)
app.use("/api/order", orderRouter)
app.use("/api/payment/create", paymentRouter)
app.use("/api/payment/verify", payementVerifyRoute)
app.listen(process.env.port)
