import Order from "../../Model/Orders.js"

export const getOrderDetails = async (req,res)=>{
const {orderId} = req.params

if(!orderId){
    return res.status(400).json({
        success : false,
        message : "Order ID is required"
    })
}

try {
    const order = await Order.findById(orderId).populate("userId", "name email")
    if(!order){
        return res.status(404).json({
            success : false,
            message : "Order not found"
        })
    }
    return res.status(200).json({
        success : true,
        message : "Order details found successfully",
        order
    })
} catch (error) {
    return res.status(500).json({
        success : false,
        message : "Internal server error",
        error : error.message
    })
}
}


export const updateOrderStatus = async (req,res) =>{
    
const {orderId} = req.params
const {status} = req.body
if(!orderId){
    return res.status(400).json({
        success : false,
        message : "Order ID is required"
    })
}

try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, {$set : {orderStatus : status }},{runValidators : true})
    if(!updatedOrder){
        return res.status(404).json({
            success : false,
            message : "Order not found"
        })
    }
    return res.status(200).json({
        success : true,
        message : "Order updated successfully",
    })
} catch (error) {
   
    return res.status(500).json({
        success : false,
        message : "Internal server error",
        error : error.message
    })
}
}



export const getOrders = async (req,res)=>{

    let {page, limit, search, orderStatus, paymentStatus , dateFilter} = req.query
    page = Number(page) || 1
  limit = Number(limit) || 40
  orderStatus = orderStatus.toLowerCase()
  paymentStatus = paymentStatus.toLowerCase()
  const filters = {}
  

if (search) {
  
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(search);

  if (isValidObjectId) {
  
    filters._id = search;
  } else {
   
    filters["shippingAddress.fullName"] = { $regex: search, $options: "i" };
  }
}
if(orderStatus !== "all"){
    filters.orderStatus = orderStatus
}
if(paymentStatus !== "all"){
    filters.paymentStatus = paymentStatus
}
let sortObj = {createdAt: -1}
if (dateFilter === 'latest') sortObj = { createdAt: -1 };
else if (dateFilter === 'oldest') sortObj = { createdAt: 1 };

  if (isNaN(page) || page < 1) {
        return res.status(400).json({ success : false, error: "page should be number or greater than 0" });
    }
  if (isNaN(limit) || limit > 100 || limit < 1) {
    return res.status(400).json({ 
        success: false, 
        error: "limit should be a number between 1 and 100" 
    });
}
    
    try {
        const totalOrders = await Order.countDocuments(filters)
    const totalPages = Math.ceil(totalOrders / limit)
   

 if(page > totalPages){
   page = totalPages === 0 ? 1 : totalPages;
  
 }
 
 const skip = (page - 1) * limit
        const orders = await Order.find(filters).select("createdAt orderStatus totalAmount shippingAddress.fullName").sort(sortObj).skip(skip).limit(limit)
      return res.status(200).json({
            success : true,
            message : "Orders find successfully",
            totalPages,
            orders
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        success : false,
        message : "Internal server error",
        error : error.message
        })
    }
}

