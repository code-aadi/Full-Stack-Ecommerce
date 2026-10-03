import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { setupBotCommands } from '../routes/telegramBotRoutes.js';

dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
    process.exit(1);
}

export const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);


setupBotCommands(bot)



export const connectTelegramBot = async () => {
    try {
        await bot.launch({ dropPendingUpdates: true });
    } catch (err) {
        console.error("❌ Telegram Bot launch error:", err);
    }
};

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
