import TelegramBot from 'node-telegram-bot-api'
import { Telegraf } from "telegraf";

exports.handler = async function (event, context) {
    const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
    const bot2 = new Telegraf(process.env.BOT_TOKEN);

    try {
        await bot.sendMessage(397739262, 'Женуля красотуля, люблю тебя!!!');
        await bot2.telegram.sendMessage(576118532, "сообщеня юхуху");
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "sending" }),
        };
    } catch (error) {
        console.log(error);
    }
};








