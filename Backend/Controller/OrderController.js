import Cart from "../Model/Cart.js";
import Order from "../Model/Orders.js";
import cartTotal from "../utils/cartTotal.js";
import validateCartItems from "../utils/ValidateCartItems.js";

const orders = async (req,res) => {
    const userId = req.user.userId
    const paymentMethod = req.body.method
   
    if(paymentMethod !== "cod"){
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
 const order = await Order.create({userId : userId, items : validatedItems, shippingAddress :address, totalAmount : totalAmount,
        paymentStatus : "pending",paymentMethod : "cod", orderStatus : "confirmed", 
  })
  
  await Cart.findOneAndDelete({user : userId})
  return res.status(200).json({
    success : true,
    message : "Order created for COD",
    orderId : order._id
  })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
      success : false,
      messasge : "Internal server error",
      error : error.message
        })
    }

}

export default orders