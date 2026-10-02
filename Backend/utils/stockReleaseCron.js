import cron from "node-cron";
import Order from "../Model/Orders.js";
import Product from "../Model/productModel.js";

// हर 5 मिनट में यह टास्क अपने आप रन होगा
cron.schedule("*/5 * * * *", async () => {
    console.log("⏰ Running Cron: Checking for expired pending orders...");
    
    try {
        const currentTime = new Date();

        
        const expiredOrders = await Order.find({
            paymentStatus: "pending",
            stockReservedUntil: {$lt: currentTime } 
        });

        if (expiredOrders.length === 0) {
            return; 
        }

        

        for (const order of expiredOrders) {
            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: item.quantity } 
                });
            }

            
            order.paymentStatus = "failed";
            order.orderStatus = "cancelled";
            order.stockReservedUntil = undefined; 
            await order.save();
        }

        

    } catch (error) {
        console.error("❌ Error in Stock Release Cron Job:", error.message);
    }
});
