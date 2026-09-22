


const requestTracker = {};

// Custom Rate Limiter Middleware
const customRateLimiter = (req, res, next) => {
   
console.log(requestTracker)
    const userIp = req.ip; // User ka IP address nikalna
    const currentTime = Date.now();
    const WINDOW_TIME = 60 * 1000; // 1 minute (milliseconds me)
    const MAX_LIMIT = 5; // 1 minute me sirf 5 requests allowed hain

    // Agar ye IP pehli baar aaya hai, toh uska record initialize karein
    if (!requestTracker[userIp]) {
        requestTracker[userIp] = {
            count: 1,
            startTime: currentTime
        };
        return next(); // Agle function/route par bhejein
    }

    const userData = requestTracker[userIp];

    // Check karein kya 1 minute ka window khatam ho gaya?
    if (currentTime - userData.startTime > WINDOW_TIME) {
        // Window expire ho gaya, toh reset karein
        userData.count = 1;
        userData.startTime = currentTime;
        return next();
    } 

    // Agar 1 minute ke andar hi hai, toh count badhayein
    userData.count++;

    // Check karein kya limit cross ho gayi?
    if (userData.count > MAX_LIMIT) {
        return res.status(429).json({
            success: false,
            message: "Aapne bohot zyada requests bhej di hain. Kripya 1 minute baad prayas karein."
        });
    }

    next();
};

export default customRateLimiter
