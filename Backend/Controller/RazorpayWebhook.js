import { sendOrderAlert } from "./telegramBotController.js";
import Cart from "../Model/Cart.js";
import Order from "../Model/Orders.js";
import Product from "../Model/productModel.js";
import razorpay from "../config/razorpay.js";
import mongoose from "mongoose";
import crypto from "crypto";
import { bot } from "../config/telegramBot.js";

const razorpayWebhook = async (req, res) => {
    const signature = req.headers["x-razorpay-signature"];
    if (!signature) {
        return res.status(400).json({ success: false, message: "Missing signature" });
    }

    // CHANGE 1 (a): Pehle yaha JSON.stringify(req.body) tha.
    // Ab req.body seedha RAW Buffer hai (server file me express.raw lagana zaroori hai),
    // kyunki Razorpay signature original raw body par banata hai.
    // Parse karke dobara string banane se formatting badal sakti hai aur valid webhook bhi reject ho sakta tha.
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET) 
        .update(req.body)
        .digest("hex");

    // CHANGE 3: "!==" ki jagah timingSafeEqual use kiya (best practice).
    // Isse compare karne me lagne wale time se signature ka andaza lagana mushkil ho jata hai.
    // Length alag ho to timingSafeEqual error deta hai, isliye pehle length check kiya.
    const a = Buffer.from(generatedSignature);
    const b = Buffer.from(signature);

    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
        return res.status(400).json({ success: false, message: "Invalid webhook signature" });
    }

    try {
        // CHANGE 1 (b): Ab body raw Buffer hai, isliye signature verify hone ke BAAD
        // yaha manually JSON.parse kiya. Pehle req.body already parsed object tha.
        const { event, payload } = JSON.parse(req.body.toString());
        const paymentEntity = payload.payment.entity;
        const razorpay_order_id = paymentEntity.order_id;
        const razorpay_payment_id = paymentEntity.id;

        const order = await Order.findOne({ paymentOrderId: razorpay_order_id });

        if (order) {
            
            if (event === "payment.captured") {
                if (order.paymentStatus === "pending") {
                    // Normal case: payment time par aaya, stock pehle se minus hai.
                    order.paymentId = razorpay_payment_id;
                    order.paymentStatus = "paid";
                    order.orderStatus = "confirmed";
                    order.stockReservedUntil = undefined; 
                    
                    await order.save();
                    await Cart.findOneAndDelete({ user: order.userId });
                    await sendOrderAlert(bot, order);
                }

                // CHANGE 4: LATE PAYMENT case. Customer ne 15 min ke baad payment kiya,
                // job order ko pehle hi "failed/cancelled" kar chuka hai aur stock wapas ho chuka hai.
                // Pehle ye case ignore ho jata tha ya order bina stock ke paid ho jata tha.
                // Ab: stock dobara atomically minus karne ki koshish karte hain.
                //  - Stock mila  -> order paid/confirmed.
                //  - Stock nahi  -> customer ko automatic refund.
                else if (order.paymentStatus === "failed") {
                    const session = await mongoose.startSession();
                    let confirmedOrder = null;
                    let outOfStock = false;

                    try {
                        await session.withTransaction(async () => {
                            confirmedOrder = null;
                            outOfStock = false;

                            // Pehle order claim kiya (sirf tabhi jab abhi bhi "failed" ho).
                            // Webhook retry ya double event aaye to dusra claim null dega, aur kuch nahi hoga.
                            const claimed = await Order.findOneAndUpdate(
                                { _id: order._id, paymentStatus: "failed" },
                                { $set: { paymentId: razorpay_payment_id, paymentStatus: "paid", orderStatus: "confirmed" } },
                                { session, new: true }
                            );
                            if (!claimed) return;

                            // Phir har item ka stock atomically minus (same logic jo order create me hai).
                            for (const item of claimed.items) {
                                const updated = await Product.findOneAndUpdate(
                                    { _id: item.productId, stock: { $gte: item.quantity } },
                                    { $inc: { stock: -item.quantity } },
                                    { session }
                                );
                                if (!updated) {
                                    // Ek bhi item ka stock kam hai: poora transaction rollback (claim bhi wapas).
                                    outOfStock = true;
                                    throw new Error("OUT_OF_STOCK");
                                }
                            }
                            confirmedOrder = claimed;
                        });
                    } catch (lateError) {
                        if (lateError.message !== "OUT_OF_STOCK") {
                            throw lateError; // koi aur error: 500 jayega, Razorpay webhook retry karega
                        }
                    } finally {
                        await session.endSession();
                    }

                    if (confirmedOrder) {
                        await Cart.findOneAndDelete({ user: confirmedOrder.userId });
                        await sendOrderAlert(bot, confirmedOrder);
                    } else if (outOfStock) {
                        // Stock nahi mila, isliye customer ko poora paisa wapas.
                        try {
                            await razorpay.payments.refund(razorpay_payment_id, {});
                        } catch (refundError) {
                            // Refund fail hua to 500 nahi bhejte (warna Razorpay baar-baar retry karega).
                            // Is log se manual refund karna padega.
                            console.error(`❌ Refund failed for payment ${razorpay_payment_id}, order ${order._id}:`, refundError.message);
                        }
                    }
                }
            }
            
            else if (event === "payment.failed") {
                // CHANGE 2: Pehle yaha stock wapas add hota tha aur order cancel ho jata tha.
                // Ab nahi karte, kyunki customer Razorpay modal me usi order_id par dobara
                // payment try (retry) kar sakta hai. Agar yaha stock wapas dete aur retry success hota,
                // to order paid ho jata par stock dobara minus nahi hota (overselling).
                // Ab order "pending" hi rehta hai. Stock release aur cancel ka kaam
                // stockReservedUntil wala expiry job karega (15 min baad).
                // "pending" check isliye hai ki paid order me kuch change na ho.
                if (order.paymentStatus === "pending") {
                    order.paymentId = razorpay_payment_id; // sirf last attempt ka id record kiya
                    await order.save();
                }
            }
        }

        return res.status(200).json({ status: "ok" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export default razorpayWebhook;