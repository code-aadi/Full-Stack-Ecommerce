import razorpay from "../config/razorpay.js"
import Order from "../Model/Orders.js"
import cartTotal from "../utils/cartTotal.js"
import validateCartItems from "../utils/ValidateCartItems.js"

const createPaymentOrder = async (req,res) => { 
    const userId = req.user.userId
    const paymentMethod = req.body.method
   
    if(paymentMethod !== "online"){
      return res.status(400).json({
        success : false,
        message : "Invalid payment method"
      })
    }
   const address = req.body.address
  try {
    const cartValidation = await validateCartItems(userId)
    if(!cartValidation.isValid){
  return res.status(cartValidation.status).json({
    success: false,
    message: cartValidation.message
  });
}
const validatedItems = cartValidation.validatedItems
const {totalAmount, tax} = cartTotal(validatedItems)
const amountInPaise = Math.round(totalAmount * 100);

const razorpayOrder = await razorpay.orders.create({
    amount : amountInPaise,
    currency : "INR",
    receipt : `receipt_${Date.now()}`
})

const order = await Order.create({userId : userId, items : validatedItems, shippingAddress :address, totalAmount : totalAmount,
        paymentStatus : "pending",paymentMethod : "online", orderStatus : "pending", paymentOrderId : razorpayOrder.id, paymentId : null 
  })


return res.status(200).json({
  success: true,
  razorpayOrderId: razorpayOrder.id,
  amount: razorpayOrder.amount,
  currency: razorpayOrder.currency
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Payment order create failed",
    });
  }
}

export default createPaymentOrder