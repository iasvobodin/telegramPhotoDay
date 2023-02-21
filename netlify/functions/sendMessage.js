import TelegramBot from 'node-telegram-bot-api'








// import { Telegraf } from "telegraf";

exports.handler = async function (event, context) {
    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });



    // bot.on('message', (msg) => {
    // const chatId = msg.chat.id;

    try {
        await bot.sendMessage(39773926, 'Женуля красотуля, люблю тебя!!!');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "sending" }),
        };
    } catch (error) {
        console.log(error);
    }
    // send a message to the chat acknowledging receipt of their message
    //   });

    // const bot = new Telegraf(process.env.BOT_TOKEN);
    // bot.telegram.sendMessage("576118532", "сообщеня юхуху");

    // bot.on('message', function (ctx, next) {
    //     ctx.telegram.sendMessage(576118532,
    //         "сообщеня юхуху"
    //     )
    // });
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: "sending" }),
    // };
};








