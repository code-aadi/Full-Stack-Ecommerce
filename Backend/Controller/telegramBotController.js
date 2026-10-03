
import Order from "../Model/Orders.js";

export const getTodaysSales = async(ctx) =>{
     try {
        const adminChatId = process.env.ADMIN_TELEGRAM_CHAT_ID;


    if (ctx.chat.id.toString() !== adminChatId) {
      return ctx.reply("❌ Unauthorized Access!");
    }

    await ctx.reply("⏳ Live Aggregation Query चल रही है...");

    const startOfToday = new Date();
    startOfToday.setHours(0,0,0,0)
   const report =  await Order.aggregate([
    {$match : {createdAt : {$gte : startOfToday}}},
    {$group : {_id : null, totalRevenue : {$sum : "$totalAmount"},  totalOrders : {$sum : 1},
codCount : {$sum : {$cond : [{$eq : ["$paymentMethod", "cod"]},1,0]}},
onlineCount : {$sum : {$cond : [{$eq : ["$paymentMethod", "online"]},1,0]}}
}},
    
   ])
  if (report.length === 0) {
      return ctx.reply(
        "📊 *TODAY'S REPORT:*\n\n🛒 आज अभी तक कोई नया ऑर्डर नहीं आया है.",
        { parse_mode: "Markdown" }
      );
    }

    const data = report[0];

    const reportMessage =
      `📊 *TODAY'S AGGREGATION REPORT*\n` +
      `----------------------------------\n` +
      `🛒 *Total Orders:* ${data.totalOrders}\n` +
      `💰 *Total Revenue:* ₹${data.totalRevenue.toFixed(2)}\n\n` +
      `💳 *Payment Method Breakdown:*\n` +
      `• COD Orders: ${data.codCount}\n` +
      `• Online Orders: ${data.onlineCount}\n` +
      `----------------------------------\n`

       await ctx.reply(reportMessage, { parse_mode: "Markdown" });
     } catch (error) {
    ctx.reply("❌ An error has occurred during database aggregation.");
     }
}






export const sendOrderAlert = async (bot, orderData) => {
    try {
        const adminChatId = process.env.ADMIN_TELEGRAM_CHAT_ID;
        if (!adminChatId) return 

        
        let itemsList = "";
        orderData.items.forEach((item, index) => {
            const shortName = item.name.length > 30 
                ? item.name.substring(0, 30) + "..." 
                : item.name;
                
            itemsList += `• ${shortName} (x${item.quantity}) - ₹${item.price}\n`;
        });

        
        const formattedAmount = Number(orderData.totalAmount).toFixed(2);

        
        const addr = orderData.shippingAddress;
        
        
                
        const message = `🛍️ *NEW ORDER RECEIVED!*

🆔 *Order ID:* ${orderData._id}
👤 *Customer:* ${addr.fullName} (${addr.phone})
📍 *City:* ${addr.city}, ${addr.state}

🛒 *ITEMS:*
${itemsList}
💳 *PAYMENT:*
💰 *Total:* ₹${formattedAmount}
💳 *Method:* ${orderData.paymentMethod.toUpperCase()} (${orderData.paymentStatus.toUpperCase()})`;

        
        await bot.telegram.sendMessage(adminChatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error("❌ Error sending telegram alert:", error.message);
    }
};






export const sendLowStockAlert = async (bot, lowStockArray) => {
    try {
        const adminChatId = process.env.ADMIN_TELEGRAM_CHAT_ID;
        if (!adminChatId || !lowStockArray || lowStockArray.length === 0) return;

       
        let productList = "";
        
        lowStockArray.forEach((productData, index) => {
            
            const product = Array.isArray(productData) ? productData[0] : productData;
            
            if (product && product.name) {
                const shortName = product.name.length > 30 
                    ? product.name.substring(0, 30) + "..." 
                    : product.name;
                
                productList += `• *${shortName}*\n  (ID: \`${product._id}\`) → 🔥 *${product.stock} left*\n\n`;
            }
        });

        // 2. पूरा एक ही कंबाइन मैसेज लेआउट
        const message = `⚠️ *LOW STOCK WARNING!*\n` +
                        `----------------------------------\n` +
                        `The stock of the following products is running low:\n\n` +
                        `${productList}` +
                        `----------------------------------\n` +
                        `🛒 _Please restock these items from your Admin Panel._`;

        await bot.telegram.sendMessage(adminChatId, message, { parse_mode: 'Markdown' });
        
    } catch (error) {
        console.error("❌ Error sending bulk low stock alert:", error.message);
    }
};


