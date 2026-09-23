import Cart from "../Model/Cart.js";
import Order from "../Model/Orders.js";
import crypto from "crypto"
const razorpayWebhook = async (req, res) => {
      const signature = req.headers["x-razorpay-signature"];

    if (!signature) {
        return res.status(400).json({ success: false, message: "Missing signature" });
    }

  
        
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET) 
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (generatedSignature !== signature) {
            return res.status(400).json({ success: false, message: "Invalid webhook signature" });
        }

    try {
        const { event, payload } = req.body;
        const paymentEntity = payload.payment.entity;
        const razorpay_order_id = paymentEntity.order_id;
        const razorpay_payment_id = paymentEntity.id;

        
        const order = await Order.findOne({ paymentOrderId: razorpay_order_id });

        if (order) {
            if (event === "payment.captured") {
                if (order.paymentStatus !== "paid") {
                    order.paymentId = razorpay_payment_id;
                    order.paymentStatus = "paid";
                    order.orderStatus = "confirmed";
                    await order.save();
                    await Cart.findOneAndDelete({ user: order.userId });
                }
            }

            
            else if (event === "payment.failed") {
                order.paymentId = razorpay_payment_id;
                order.paymentStatus = "failed";
                order.orderStatus = "cancelled"; 
                await order.save();
            }
        }

        return res.status(200).json({ status: "ok" });

    } catch (error) {
        return res.status(500).json({ success: false, message : "Internal server error", error: error.message });
    }
};


export default razorpayWebhook
