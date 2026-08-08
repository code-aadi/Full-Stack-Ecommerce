import { User } from "../Model/Users.js"
import bcrypt from "bcrypt"

export const login = async (req,res)=>{
    res.send("you hit user route")
}

export const register = async (req,res)=>{
const {name, email, password} = req.body
   try {
     const emailExist = User.findOne({email})
     if(emailExist){
        return res.status(409).json({
            success : false,
            message : "Email Id Already Exist"
        })
     }
     const hashedPassword = await bcrypt.hash(password, 10)
     const newUser = await User.create({name, email, password : hashedPassword})
     return res.status(201).json({
        success : true,
        message : "User Created Successfully",
        user : {
            id : newUser._id,
            name : newUser.name,
            email : newUser.email
        }
     })
   } catch (error) {
      return res.status(409).json({
            success : false,
            message : "Internal Server Error"
        })
   }
}