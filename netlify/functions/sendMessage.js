import { Telegraf } from "telegraf";

exports.handler = async function (event, context) {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    bot.telegram.sendMessage("576118532", "сообщеня юхуху");

    bot.on('message', function (ctx, next) {
        ctx.telegram.sendMessage(576118532,
            "сообщеня юхуху"
        )
    });
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "sending" }),
    };
};








