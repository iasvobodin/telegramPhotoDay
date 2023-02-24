// import TelegramBot from 'node-telegram-bot-api'
import { Telegraf } from "telegraf";

export async function handler(event, context) {
    // const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const media = [
        {
            media: 'https://sunny-kangaroo-fb0e42.netlify.app/image/1.jpg?nf_resize=fit&w=300',
            caption: 'Идея для фотосессии, студия такая-то, дата вот такая, айдате все ко мне фоткаться!!!',
            type: 'photo'
        },
        {
            media: 'https://sunny-kangaroo-fb0e42.netlify.app/image/2.webp?nf_resize=fit&w=500',
            type: 'photo'
        }
    ]

    //FIND ALL USERS

    try {
        const response = await fetch('https://graphql.fauna.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FAUNA_SECRET_KEY}`
            },
            body: JSON.stringify({
                query: `
            query FindAllUsers {
                allUsers {
                  data {
                    id
                    username
                  }
                }
              }
        `,
            }),
        })
        const result = await response.json();
        console.log(result.data.allUsers.data, "result");

        try {
            await Promise.all(
                result.data.allUsers.data.map(async (e) => {
                    await bot.telegram.sendMediaGroup(e.id, media)
                }))
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "sending" }),
            };

        } catch (error) {
            console.log(error);
        }

    } catch (e) {
        console.log(e);
        return ctx.reply(`Что-то пошло не так`)
    }

};








