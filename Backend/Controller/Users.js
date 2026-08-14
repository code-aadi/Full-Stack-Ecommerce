import { User } from "../Model/Users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../utils/jwtHelper.js"

export const register = async (req,res)=>{
const {name, email, password} = req.body
   try {
     const emailExist = await User.findOne({email})
     if(emailExist){
        return res.status(409).json({
            success : false,
            message : "Email Id Already Exist"
        })
     }
     const hashedPassword = await bcrypt.hash(password, 10)
     const newUser = await User.create({name, email, password : hashedPassword})

     const accessToken = generateAccessToken(newUser._id)
     const refreshToken = generateRefreshToken(newUser._id)
    res.cookie("REFRESH-TOKEN", refreshToken,{
        httpOnly : true,
        sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
        secure : process.env.NODE_ENV === "production",
        maxAge :  7 * 24 * 60 * 60 * 1000

    })
     
     return res.status(201).json({
        success : true,
        message : "User Created Successfully",
        accessToken,
         user : {
            id : newUser._id,
            name : newUser.name,
            email : newUser.email
        }
      
     })
   } catch (error) {
    
      return res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : error.messgae
        })
   }
}




export const login = async (req,res)=>{
  const {email, password} = req.body
 try {
    const user = await User.findOne({email})
   
    if(!user){
        return res.status(401).json({
            success : false,
            message : "Invalid email or password"
        })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        return res.status(401).json({
            success : false,
            message : "Invalid email or password"
        })
    }
    
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)
    res.cookie("REFRESH-TOKEN", refreshToken,{
        httpOnly : true,
        sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
        secure : process.env.NODE_ENV === "production",
         maxAge :  7 * 24 * 60 * 60 * 1000 

    })
    res.status(200).json({
        success : true,
        message : "User logged in successfully",
                accessToken,
        user : {
            id : user._id,
            name : user.name,
            email : user.email
        }
    })
 } catch (error) {
    res.status(500).json({
        success : false,
        message : "Internal Server Error",
        error : error.message
    })
 }
}



export const getCurrentUser = async(req,res)=>{
   const id = req.user.userId
  try {
     const user = await User.findById(id)

     if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found"
    });
}
  
     res.status(200).json({
        success : true,
        message : "Current user fetched successfully",
        user : {
             id: user._id,
    name: user.name,
    email: user.email
        }
     })
  } catch (error) {
    res.status(500).json({
        success : false,
        message : "Internal Server Error",
        error : error.message
    })
  }
}


export const refreshAccessToken = async (req,res) => {
    
    try {
        const refreshToken = req.cookies["REFRESH-TOKEN"]
       
        if(!refreshToken){
            return res.status(401).json({
                success : false,
                message : "Refresh token required"
            })
        }
        
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET)
        const newAccessToken = generateAccessToken(decoded.userId)

        return res.status(200).json({
            success : true,
            accessToken : newAccessToken
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Invalid or expired refresh token",
            error : error.message
        })
    }
}



export const logout = async (req, res) => {
    try {
        
        return res
            .clearCookie('REFRESH-TOKEN', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            })
            .status(200)
            .json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
