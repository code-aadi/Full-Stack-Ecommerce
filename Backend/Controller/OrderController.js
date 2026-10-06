import mongoose from "mongoose";
import { bot } from "../config/telegramBot.js";
import Cart from "../Model/Cart.js";
import Order from "../Model/Orders.js";
import cartTotal from "../utils/cartTotal.js";
import validateCartItems from "../utils/ValidateCartItems.js";
import { sendLowStockAlert, sendOrderAlert } from "./telegramBotController.js";
import Product from "../Model/productModel.js";






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
       const session = await mongoose.startSession() 

    try {
        const cartValidation = await validateCartItems(userId)
   
if(!cartValidation.isValid){
  return res.status(cartValidation.status).json({
    success: false,
    message: cartValidation.message
  });
}
  session.startTransaction()
const validatedItems = cartValidation.validatedItems
const lowStockProductsToSend = []
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
                throw new Error(`The stock of ${item.name} has just run out.`);
            }
              const LOW_STOCK_LIMIT = 5; 
            if (updatedProduct && updatedProduct.stock <= LOW_STOCK_LIMIT) {
                lowStockProductsToSend.push(updatedProduct);
            }
}

const {totalAmount, tax} = cartTotal(validatedItems)
 const order = new Order(
  {userId : userId,
    items : validatedItems,
     shippingAddress :address, 
     totalAmount : totalAmount,
        paymentStatus : "pending",
        paymentMethod : "cod", 
        orderStatus : "confirmed", 
  }
 )
 await order.save({session})
  
  await Cart.findOneAndDelete({user : userId}).session(session)
  await session.commitTransaction()
  sendOrderAlert(bot, order)
 
 await sendLowStockAlert(bot, lowStockProductsToSend);
  return res.status(200).json({
    success : true,
    message : "Order created for COD",
    orderId : order._id
  })

    } catch (error) {
       if (session.inTransaction()) {
            await session.abortTransaction();
        } 
       if (error.message.includes("The stock of") || error.message.includes("run out")) {
            return res.status(400).json({
                success: false,
                message: error.message 
            });
        }
      
        return res.status(500).json({
      success : false,
      messasge : "Internal server error",
      error : error.message
        })
    }finally{
      await session.endSession()
    }

}

export default orders



