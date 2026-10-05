import cron from "node-cron";
import { User } from "../Model/Users.js";


cron.schedule("0 0 * * *", async () => {
      const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    try {
     await User.deleteMany({isVerified : false, createdAt : {$lt : twentyFourHoursAgo}})   
       

    } catch (error) {
        console.error("❌ Error in Delete Unverified Users:", error.message);
    }
},{
    scheduled: true,
    timezone: "Asia/Kolkata"
});
