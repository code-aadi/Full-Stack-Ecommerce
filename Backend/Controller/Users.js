import { User } from "../Model/Users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../utils/jwtHelper.js"
import RefreshToken from "../Model/RefreshToken.js"
import { hashToken } from "../utils/tokenHash.js";
import sendEmail from "../utils/sendEmail.js"

export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      if(user.isVerified){
        return res.status(409).json({
        success: false,
        message: "Email Id Already Exist"
      })
      }

      const hashedPassword = await bcrypt.hash(password, 10);
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);

            user.name = name;
            user.password = hashedPassword;
            user.otp = generatedOtp;
            user.otpExpiry = otpExpiryTime;
            
            await user.save();

            await sendEmail({ email, subject: 'Email Verification OTP', html: `<h3>Your new code: ${generatedOtp}</h3><p>It will expire in 5 minutes.</p>` });

            return res.status(200).json({ success: true, message: 'New OTP has been sent to your email।' });
    }


    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otp: generatedOtp,
      otpExpiry: otpExpiryTime

    })
await sendEmail({
            email: newUser.email,
            subject: 'Email Verification OTP',
            html: `<h3>Your OTP code: ${generatedOtp}</h3>`
        });
   
 return res.status(201).json({ 
            success: true, 
            message: 'Registration successful! An OTP has been sent to your email.' 
        });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.messgae
    })
  }
}




export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }
 if (!user.isVerified) {
      return res.status(403).json({ 
        success: false, 
        message: "Your email is not verified. Please verify your email before logging in." 
      });
    }
    const accessToken = generateAccessToken(user._id)
    const refreshToken = await generateRefreshToken(user._id)
    res.cookie("REFRESH-TOKEN", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000

    })
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}



export const getCurrentUser = async (req, res) => {
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
      success: true,
      message: "Current user fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}








export const refreshAccessToken = async (req, res) => {
  try {
    const incomingToken = req.cookies["REFRESH-TOKEN"];

    if (!incomingToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(incomingToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }


    const tokenHash = hashToken(incomingToken);
    const storedToken = await RefreshToken.findOne({ tokenHash });
    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not recognized",
      });
    }

    if (storedToken.used) {
      await RefreshToken.updateMany(
        { familyId: storedToken.familyId },
        { used: true }
      );

      res.clearCookie("REFRESH-TOKEN");
      return res.status(403).json({
        success: false,
        message: "Token reuse detected. Please login again.",
      });
    }

    storedToken.used = true;
    await storedToken.save();

    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = await generateRefreshToken(decoded.userId, decoded.familyId);

 res.cookie("REFRESH-TOKEN", newRefreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};






export const logout = async (req, res) => {
  try {
    const incomingToken = req.cookies["REFRESH-TOKEN"];

    if (incomingToken) {
      const tokenHash = hashToken(incomingToken);
      const storedToken = await RefreshToken.findOne({ tokenHash });

      if (storedToken) {
        await RefreshToken.updateMany(
          { familyId: storedToken.familyId },
          { used: true }
        );
      }
    }

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


export const verifyOtpAndLogin = async (req, res) => {
  try {
  const {email, otp} = req.body
   const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User Not Found।' });


 if (user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({ success: false, message: 'The OTP is incorrect or has expired।' });
        }

  user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

   const accessToken = generateAccessToken(user._id)
    const refreshToken = await generateRefreshToken(user._id)
    res.cookie("REFRESH-TOKEN", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000

    })

    return res.status(201).json({
      success: true,
      message: "Email verified and login successful.",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    })
} catch (error) {
  console.log(error)
   return res.status(500).json({ success: false, message : "Internal server error" , error: error.message });
}
}





export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'No user was found with this email.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: 'This account is already verified.' });
        }

        
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000); 

      
        user.otp = generatedOtp;
        user.otpExpiry = otpExpiryTime;
        await user.save();

        await sendEmail({
            email: user.email,
            subject: 'New Email Verification OTP',
            html: `<h3>Your new OTP: ${generatedOtp}</h3><p>It will expire in 5 minutes.</p>`
        });

        return res.status(200).json({ 
            success: true, 
            message: 'A new OTP has been successfully sent to your email.' 
        });

    } catch (error) {
      console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
};
