import Cart from "../Model/Cart.js";
import Order from "../Model/Orders.js";
import cartTotal from "../utils/cartTotal.js";
import validateCartItems from "../utils/ValidateCartItems.js";





export const getOrders = async(req,res)=>{
  const userId = req.user.userId
  try {
    const userOrders = await Order.find({userId : userId}).populate("items.productId" , "image")
    if(!userOrders || userOrders.length === 0){
      return res.status(404).json({
        success : false,
        message : "No order found",
      })
    }
    return res.status(200).json({
      success : true,
      message : "Order found successfully",
      orders : userOrders
    })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : "Internal server error",
      error : error.message
    })
  }
}




export const getOrderDetails = async(req,res)=>{
  const {id} = req.params
  const userId = req.user.userId
  if(!id){
    return res.status(400).json({
      message : "Product id is required",
      success : false
    })
  }
  try {
    const userOrder = await Order.findOne({_id : id, userId : userId})
   if(!userOrder){
    return res.status(404).json({
      success : false,
      message : "User's order not found"
    })
   }
   return res.status(200).json({
    success : true,
    message : "User order found successfully",
    userOrder
   })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : "Internal server error",
      error : error.message
    })
  }
}

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