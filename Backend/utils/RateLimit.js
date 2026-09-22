import rateLimit from "express-rate-limit";


export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 5, 
    message: {
        success: false,
        message: "Too many security attempts. Please try again after 15 minutes.",
        status : 429
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const searchLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    limit: 15, 
    message: {
        success: false,
        message: "You are searching too fast. Please slow down.",
        status : 429
    },
    standardHeaders: true,
    legacyHeaders: false,
});


export const productLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    limit: 100, 
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
        status : 429
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const forgotPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    limit: 3, // Forgot password/OTP sirf 3 baar allowed hai 15 mins me
    message: { success: false, status: 429, message: "Too many OTP requests. Please try again after 15 mins." },
    standardHeaders: true, legacyHeaders: false,
});


export const paymentLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    limit: 3, 
    message: { success: false, status: 429, message: "Payment request limited. Please wait a moment." },
    standardHeaders: true, legacyHeaders: false,
});