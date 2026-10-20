import cron from "node-cron";
import mongoose from "mongoose";
import Order from "../Model/Orders.js";
import Product from "../Model/productModel.js";

cron.schedule("*/5 * * * *", async () => {
    try {
        const currentTime = new Date();

        
        const expiredOrders = await Order.find({
            paymentStatus: "pending",
            stockReservedUntil: { $lt: currentTime }
        }).lean();

        if (expiredOrders.length === 0) {
            return;
        }

        for (const expired of expiredOrders) {
            const session = await mongoose.startSession();

            try {
               
                await session.withTransaction(async () => {

                    const claimed = await Order.findOneAndUpdate(
                        {
                            _id: expired._id,
                            paymentStatus: "pending",
                            stockReservedUntil: { $lt: new Date() }
                        },
                        {
                            $set: { paymentStatus: "failed", orderStatus: "cancelled" },
                            $unset: { stockReservedUntil: "" }
                        },
                        { session, new: true }
                    );

                    if (!claimed) {
                        return; 
                    }

                    for (const item of claimed.items) {
                        await Product.findByIdAndUpdate(
                            item.productId,
                            { $inc: { stock: item.quantity } },
                            { session }
                        );
                    }
                });
            } catch (orderError) {
                
                console.error(`❌ Stock release failed for order ${expired._id}:`, orderError.message);
            } finally {
                await session.endSession();
            }
        }
    } catch (error) {
        console.error("❌ Error in Stock Release Cron Job:", error.message);
    }
});