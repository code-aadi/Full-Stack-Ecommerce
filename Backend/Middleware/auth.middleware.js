import jwt from "jsonwebtoken"


function authMiddleware(req,res,next){
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
     req.user = decoded
     next()
  } catch (error) {
    return res.status(401).json({
    success: false,
    message: "Invalid or expired token"
});
  }
}

export default authMiddleware