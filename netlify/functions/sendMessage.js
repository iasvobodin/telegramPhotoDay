import { Telegraf } from "telegraf";

exports.handler = async function (event, context) {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    bot.telegram.sendMessage(576118532, "сообщеня юхуху");
};








