import mongoose from "mongoose";
import razorpay from "../config/razorpay.js";
import Order from "../Model/Orders.js";
import Product from "../Model/productModel.js"; 
import cartTotal from "../utils/cartTotal.js";
import validateCartItems from "../utils/ValidateCartItems.js";

const createPaymentOrder = async (req, res) => { 
    const userId = req.user.userId;
    const paymentMethod = req.body.method;
   
    if (paymentMethod !== "online") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method"
      });
    }
    
    const address = req.body.address;
    
    try {
        const cartValidation = await validateCartItems(userId);
        if (!cartValidation.isValid) {
            return res.status(cartValidation.status).json({
                success: false,
                message: cartValidation.message
            });
        }
        
        const validatedItems = cartValidation.validatedItems;
        const { totalAmount, tax } = cartTotal(validatedItems);
        const amountInPaise = Math.round(totalAmount * 100);

        const session = await mongoose.startSession();
        
        try {
            session.startTransaction();

            for (const item of validatedItems) {
                const updatedProduct = await Product.findOneAndUpdate(
                    { 
                        _id: item.productId, 
                        stock: { $gte: item.quantity } 
                    },
                    { 
                        $inc: { stock: -item.quantity } 
                    },
                    { session, new: true }
                );

                if (!updatedProduct) {
                    throw new Error(`The stock of ${item.name} has just run out. You cannot proceed to payment.`);
                }
            }

            const razorpayOrder = await razorpay.orders.create({
                amount: amountInPaise,
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            });

            const order = new Order({
                userId: userId, 
                items: validatedItems, 
                shippingAddress: address, 
                totalAmount: totalAmount,
                paymentStatus: "pending",
                paymentMethod: "online", 
                orderStatus: "pending", 
                paymentOrderId: razorpayOrder.id, 
                paymentId: null,
                stockReservedUntil: new Date(Date.now() + 15 * 60 * 1000) // 💡 15 मिनट का लॉक
            });

            
            await order.save({ session });
            
            await session.commitTransaction();

            return res.status(200).json({
              success: true,
              razorpayOrderId: razorpayOrder.id,
              amount: razorpayOrder.amount,
              currency: razorpayOrder.currency
            });

        } catch (innerError) {
            
            await session.abortTransaction();
            
            
            if (innerError.message.includes("run out")) {
                return res.status(400).json({
                    success: false,
                    message: innerError.message
                });
            }
            throw innerError; 
        } finally {
            await session.endSession();
        }

    } catch (error) {
       
        return res.status(500).json({
          success: false,
          message: "Payment order create failed",
          error: error.message
        });
    }
}

export default createPaymentOrder;
