import Cart from "../Model/Cart.js"
import Product from "../Model/productModel.js"

export async function addToCart(req,res){
    const userId = req.user.userId
    
  const {productId, quantity} = req.body
  const qty = Number(quantity)
if (!quantity || qty < 1 || isNaN(qty)) {
   return res.status(400).json({ success : false, message : "Invalid Quantity" });
}
/*
 try {
     const productExist = await Product.findById(productId)
  if(!productExist){
    return res.status(404).json({
        success : false,
        message : "Requested product does not exist"
    })
  }
  let userCart = await Cart.findOne({user : userId})
  if(!userCart){
    const newUserCart = await Cart.create({user : userId,
         items:[{product : productId, quantity : quantity}]
        })
        return res.status(200).json({
    success : true,
    message : "Product added successfully",
    cart : newUserCart
})
  }
  
  const itemIndex = userCart.items.findIndex(item => item.product.toString() === productId.toString())
  if(itemIndex !== -1){
    userCart.items[itemIndex].quantity += quantity
  }
  else{
 userCart.items.push({product : productId, quantity : quantity})
  }
   userCart = await userCart.save()
console.log(userCart)
res.status(200).json({
    success : true,
    message : "Cart updated successfully",
    cart : userCart
})
 } catch (error) {
  return res.status(500).json({
    success: false,
    message: "Internal server error"
})
 }*/

try {
  const productExist = await Product.findById(productId)
  if(!productExist){
    return res.status(404).json({
        success : false,
        message : "Requested product does not exist"
    })
  }
  
  let userCart = await Cart.findOneAndUpdate({user : userId, "items.product" : productId},
    {$inc : {"items.$.quantity" : quantity}, } , {returnDocument : "after"}
  )
  if(!userCart){
 userCart = await Cart.findOneAndUpdate({user : userId }, 
  {$push : {items : {product : productId, quantity : quantity}}}, {upsert : true, returnDocument : "after"}
 )
  }

 return res.status(200).json({
    success : true,
    message : "Cart updated successfully",
    cart : userCart
})
  
} catch (error) {
  console.log(error)
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error : error.message
})
}

}



export async function getCarts(req,res){
    const userId = req.user.userId
 try {
    const userCart = await Cart.findOne({user : userId}).populate("user", "name email").populate("items.product")
     if (!userCart) {
     
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: {
          user: userId,
          items: [], 
          totalPrice: 0
        }
      });
    }

    
    return res.status(200).json({
      success: true,
      cart: userCart
    });

 } catch (error) {
    return res.status(500).json({
        success : false,
        message : "Internal server error",
        error : error.message
    })
 }
}


export async function updateQuantity(req,res) {
      const userId = req.user.userId
     const {newQuantity, productId} = req.body
     const qty = Number(newQuantity)
     if (qty < 0) {
    return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative"
    })
}
if(qty === 0){
        const updatedCart = await Cart.findOneAndUpdate({user : userId},{$pull : {items : {product : productId}}})
        return res.status(200).json({
          success : true,
          message : "Product remove from cart"
        })
      }
    try {
      
      const updatedCart = await Cart.findOneAndUpdate({user : userId, "items.product" : productId}, {$set : {"items.$.quantity": qty}})
if(!updatedCart){
        return res.status(404).json({
          success : false,
          message : "Product not found in Cart"
        })
      }
      return res.status(200).json({
        success : true,
        message : "Quantity updated successfully"
      })
    } catch (error) {
       return res.status(500).json({
    success: false,
    message: "Server error",
    error: error.message
  });
    }

}



export async function removeFromCart(req,res) {
   const userId = req.user.userId
   const {productId} = req.params
 
   try {
    const removeProduct = await Cart.findOneAndUpdate(
  { 
    user: userId, 
    "items.product": productId 
  },
  { 
   
    $pull: { items: { product: productId } } 
  },
  { 
    new: true 
  }
);
if(!removeProduct){
  return res.status(404).json({
    success : false,
    message : "Product not found in cart"
  })
}
return res.status(200).json({
  success : true,
  message : "Item deleted successfully"
})
   } catch (error) {
    return res.status(500).json({
      success : false,
      message : "Internal server error",
      error : error.message
    })
   }
}


export async function clearCart(req,res) {
     const userId = req.user.userId
try {
  const deleteCartItems = await Cart.findOneAndDelete({user : userId}, 
    {$set : {items : []}, }, {$new : true}
  )
return res.status(200).json({
  success : true,
  message : "Cart delete successfully"
})
} catch (error) {
  res.status(500).json({
    success : false,
    message : "Internal server error",
    error : error.message
  })
}
}