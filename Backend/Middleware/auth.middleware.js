import jwt from "jsonwebtoken"
import { User } from "../Model/Users.js"


async function authMiddleware (req,res,next){
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]
 

if(!token){
    return res.status(401).json({
        success : false,
        message : "Authentication Required"
    })
    }

  try {
     const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
     const userDetails = await User.findById(decoded.userId).select("-password").lean();

if (!userDetails) {
  return res.status(404).json({ message: "User not found!" });
}

req.user = { 
  ...decoded, 
  role: userDetails.role, 
  isSuperAdmin: userDetails.isSuperAdmin 
};
     next()
  } catch (error) {
    return res.status(401).json({
    success: false,
    message: "Invalid or expired token",
    error : error.message,
    
});
  }
}

export default authMiddleware