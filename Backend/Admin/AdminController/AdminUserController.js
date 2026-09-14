import mongoose from "mongoose"
import { User } from "../../Model/Users.js"

export const getUsers = async (req,res) => {

  let {search, roleFilter, limit, page} = req.query
    page = Number(page) || 1
  limit = Number(limit) || 10
  roleFilter = roleFilter.toLowerCase()
const filters = {}

if(search){
  filters.$or = [{ name: { $regex: search, $options: "i" } },      
    { email: { $regex: search, $options: "i" } }]
}
if(roleFilter !== "all"){
  filters.role = roleFilter
}

    try {

   const totalOrders = await User.countDocuments(filters)
    const totalPages = Math.ceil(totalOrders / limit)
   

 if(page > totalPages){
   page = totalPages === 0 ? 1 : totalPages;
  
 }
 const skip = (page - 1) * limit


    const users = await User.aggregate([
      {$match : filters},
      {
    $sort : {createdAt : 1}
  },
  {$skip : skip},
  {$limit : limit},
  {
    $lookup: {
      from: "orders",       
      localField: "_id",    
      foreignField: "userId", 
      as: "allOrders"
    }
  },
  
  {
    $addFields: {
      orderCount: { $size: "$allOrders" } 
    }
  },
  {
    $project: {
      allOrders: 0,
      password : 0,
      __v : 0
    }
  }
])

        return res.status(200).json({
            success : true,
            message : "Users find successfully",
            users,
            totalPages
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        })
    }
}



export const getUserDetails = async(req,res)=>{
  const {id} = req.params
  if(!id || id.length != 24){
    return res.status(400).json({
      success : false,
      message : "Id is required"
    })
  }
  try {
   
    const userData = await User.aggregate([
  {$match : { _id: new mongoose.Types.ObjectId(id) }},
  {$lookup : {
    from : "orders",
    localField : "_id",
    foreignField : "userId",
    as : "userOrders"
  }},
  {$addFields : {orderCount : {$size : "$userOrders"}}},
   {
    $project: {
      userOrders: 0,
      password : 0,
      __v : 0
    }
  }
])
const userObject = userData[0]
    if(!userObject){
      return res.status(404).json({
        success : false,
        message : "User data not found"
      })
    }
     return res.status(200).json({
        success : true,
        message : "User data found successfully",
        userData : userObject
      })
  } catch (error) {
    return res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        })
  }
}


export const updateUserRole = async(req,res)=>{
  const {id} = req.params
  const {newRole} = req.body
  

   
   // const currentLoggedInUser = req.user; 


     const currentLoggedInUser = true; 

   
    if (!currentLoggedInUser || currentLoggedInUser.isSuperAdmin !== true) {
      return res.status(403).json({ 
        message: "Only the Super Admin has the right to change roles!" 
      });
    }


   
  const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ message: "User nahi mila!" });
    }

   
    targetUser.role = newRole;
    await targetUser.save();

    return res.status(200).json({ 
      message: `${targetUser.name} ka role successfully badal kar ${newRole} kar diya gaya hai.` 
    });

    
}