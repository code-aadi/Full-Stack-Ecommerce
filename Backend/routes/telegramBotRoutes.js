// routes/botRoutes.js
import { getTodaysSales } from "../Controller/telegramBotController.js";

export const setupBotCommands = (bot) => {
    bot.command('sales', getTodaysSales);
    bot.command('test', (ctx) => ctx.reply('👋 Connected!'));
};
