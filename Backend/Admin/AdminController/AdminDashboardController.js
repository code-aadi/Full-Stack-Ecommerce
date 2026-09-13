import Product from "../../Model/productModel.js";
import Order from "../../Model/Orders.js";
import { User } from "../../Model/Users.js";


export const adminDashboard = async (req,res)=>{

    async function getTotalSales(){

const result = await Order.aggregate([
  {$match : {"paymentStatus" : "paid", "orderStatus" : {$in : ["confirmed", "shipped", "delivered"]}}},
  {$group : {_id : null, total : {$sum : "$totalAmount"}}}
])

return result[0]?.total || 0

}

try {
    const [totalUsers, totalOrders, totalProducts, latestOrders, lowStockProducts, totalSales] = await Promise.all([
            User.countDocuments(),                       // 1. Total Users Count
            Order.countDocuments(),                      // 2. Total Orders Count
            Product.countDocuments({ isActive: true }),  // 3. Total Active Products Count
            Order.find().sort({ createdAt: -1 }).limit(5).select("userId totalAmount orderStatus").populate("userId", "name"), // 4. Latest 5 Orders
            Product.find({ stock: { $lt: 10 }, isActive: true }).select("name stock"),
            getTotalSales()
        ]);

        return res.status(200).json({
            success : true,
            message : "Dashboard data found",
            totalUsers,
            totalOrders,
            totalProducts,
            latestOrders,
            lowStockProducts,
            totalSales : totalSales.toFixed(2)
        })
} catch (error) {
    return res.status(500).json({
        success : false,
        message : "Internal server error",
        error : error.message
    })
}
        
}


