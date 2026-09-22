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
import AdminProductRoute from "./Admin/AdminRoutes/AdminProductRoutes.js"
import AdminDashboardRoutes from "./Admin/AdminRoutes/AdminDashboardRoutes.js"
import AdminOrderRoute from "./Admin/AdminRoutes/AdminOrdersRoutes.js"
import AdminUserRoutes from "./Admin/AdminRoutes/AdminUserRoutes.js"
import  { paymentLimiter, productLimiter } from "./utils/RateLimit.js"







const app = express()
connectDB()

app.use(express.json())

app.use(cookieParser())

app.use(cors({origin : "http://localhost:5173", credentials : true}))

app.use("/api/products", productLimiter,  productRouter);




app.use("/api/auth",  userRouter )
app.use("/api/cart", productLimiter, cartRouter)
app.use("/api/checkout", paymentLimiter, checkoutRouter)
app.use("/api/order", productLimiter, orderRouter)
app.use("/api/payment/create", paymentLimiter, paymentRouter)
app.use("/api/payment/verify", paymentLimiter, payementVerifyRoute)

app.use("/api/admin/product", AdminProductRoute)
app.use("/api/admin/dashboard", AdminDashboardRoutes)
app.use("/api/admin/orders", AdminOrderRoute)
app.use("/api/admin/users", AdminUserRoutes)
app.listen(process.env.port)
