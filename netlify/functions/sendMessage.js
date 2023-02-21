// import TelegramBot from 'node-telegram-bot-api'
import { Telegraf } from "telegraf";

exports.handler = async function (event, context) {
    // const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
    const bot = new Telegraf(process.env.BOT_TOKEN);

    try {

        const media = [
            {
                media: 'https://sunny-kangaroo-fb0e42.netlify.app/image/1.jpg?nf_resize=fit&w=300',
                caption: 'From URL',
                type: 'photo'
            },
            {
                media: 'https://sunny-kangaroo-fb0e42.netlify.app/image/2.webp?nf_resize=fit&w=500',
                caption: 'From URL',
                type: 'photo'
            }

        ]

        await bot.telegram.sendMediaGroup(chatId, media)
        await bot.telegram.sendMessage(576118532, "сообщеня юхуху");
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "sending" }),
        };
    } catch (error) {
        console.log(error);
    }
};








