import Token from "../Model/TokenModel.js";
import { User } from "../Model/Users.js"
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcrypt"

export const forgotPassword = async (req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json({
            success : false,
            message : "Email is required"
        })
    }
    try {
      const userExist = await User.findOne({email : email})
       if (!userExist) {
            return res.status(200).json({
                success: true,
                message: "If this email is registered with us, a password reset link has been sent."
            });
        }
        await Token.deleteOne({userId : userExist._id})
        const resetToken = crypto.randomBytes(32).toString('hex');
       const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
       await Token.create({
        userId : userExist._id,
        token : hashedToken
       })
     const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

     const message = `<p>You have requested a password reset</p>
                 <p>Click the link below to change your password (this link is valid for 10 minutes):</p>
                 <a href="${resetUrl}">${resetUrl}</a>`;
       

try {
    
    await sendEmail({
        email: userExist.email,
        subject: 'Password Reset Request',
        html: message
    });

    return res.status(200).json({
        success: true,
        message: "If this email is registered with us, a password reset link has been sent."
    });
    
} catch (error) {
    
    console.log("Email Error:", error);
    return res.status(500).json({ success: false, message: "Email could not be sent" });
}


    } catch (error) {
         return res.status(200).json({
                success: false,
                message: "Internal server error."
            });
    }
}





export const resetPassword = async (req, res) => {
    const { token } = req.params;  
    const { password } = req.body;  
if(!password || password.length < 6){
    return res.status(400).json({
        success : false,
        message : "The password must be at least 6 characters long"
    })
}
if (!token || token.trim() === "" || token === "undefined" || token === "null") {
        return res.status(400).json({ 
            success: false, 
            message: "A token is required. Please use the correct link provided in the email." 
        });
    }
    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const tokenDoc = await Token.findOne({ token: hashedToken });

        if (!tokenDoc) {
            return res.status(400).json({ 
                success: false, 
                message: "The token is invalid or has expired." 
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(tokenDoc.userId, { password: hashedPassword });

        await tokenDoc.deleteOne();

        return res.status(200).json({ 
            success: true, 
            message: "Password successfully changed! You can now log in." 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};




export const verifyToken =  async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const tokenDoc = await Token.findOne({ token: hashedToken });
        
        if (!tokenDoc) {
            return res.status(400).json({ isValid: false, message: "टोकन इनवैलिड या एक्सपायर हो चुका है।" });
        }
        return res.status(200).json({ isValid: true });
    } catch (error) {
        return res.status(500).json({ isValid: false });
    }
}
