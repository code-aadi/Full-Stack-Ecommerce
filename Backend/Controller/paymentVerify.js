import Cart from "../Model/Cart.js";
import Order from "../Model/Orders.js";
import crypto from "crypto"

const paymentVerify = async (req,res) =>{
    const {
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
} = req.body;


if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
  return res.status(400).json({
    success: false,
    message: "Payment verification data is missing"
  });
}
try {
    const order = await Order.findOne({userId : req.user.userId, paymentOrderId : razorpay_order_id})

    if (!order) {
  return res.status(404).json({
    success: false,
    message: "Order not found"
  });
}


const generatedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  .update(`${order.paymentOrderId}|${razorpay_payment_id}`)
  .digest("hex");

  if (generatedSignature !== razorpay_signature) {
  return res.status(400).json({
    success: false,
    message: "Payment verification failed"
  });
}
order.paymentId = razorpay_payment_id;
order.paymentStatus = "paid";
order.orderStatus = "confirmed";

await order.save();

await Cart.findOneAndDelete({user : req.user.userId})
return res.status(200).json({
  success: true,
  message: "Payment verified successfully",
  orderId: order._id
});

} catch (error) {
return res.status(500).json({
    success : false,
    message : "Internal server error",
    error : error.message
})
}
}
export default paymentVerify