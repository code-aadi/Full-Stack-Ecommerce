import Cart from "../Model/Cart.js"
import { User } from "../Model/Users.js";
import cartTotal from "../utils/cartTotal.js";
import validateCartItems from "../utils/ValidateCartItems.js";




async function checkOut(req,res){
  const {fullName, phone, pincode, flatNo, street, landmark, city, state, addressType} = req.body.address
const userId = req.user.userId
const isDefault = req.body.isDefault


 const userAddress = {
      fullName : fullName,
      phone : phone,
      pincode : pincode,
      flatNo : flatNo,
      street : street,
      city : city,
      state : state,
      addressType : addressType
    }
    if(landmark){
      userAddress.landmark = landmark
    }

try {
  if(isDefault){
   await User.findByIdAndUpdate(userId, {$set : {defaultAddress : userAddress}}) 
  }
  
  

const cartValidation = await validateCartItems(userId)

if(!cartValidation.isValid){
  return res.status(cartValidation.status).json({
    success: false,
    message: cartValidation.message
  });
}
const validatedItems = cartValidation.validatedItems

const {totalAmount, tax} = cartTotal(validatedItems)

return res.status(200).json({
  success: true,
  items: validatedItems,
  totalAmount,
  shippingAddress : userAddress
});


} catch (error) {
  console.log(error)
  return res.status(500).json({
    success : false,
    message : 'Internal server error',
    error : error.message
  })
}

}

export default checkOut