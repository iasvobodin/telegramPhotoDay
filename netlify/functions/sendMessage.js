// import TelegramBot from 'node-telegram-bot-api'
import { Telegraf, Markup } from "telegraf";


export async function handler(event, context) {
    // const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
    const bot = new Telegraf(process.env.BOT_TOKEN);
    // const url1 = new URL(
    //     "https://vk.com/3blok"
    //   );
    //   const url2 = new URL(
    //     "https://instagram.com/scandi_photostudio?igshid=YmMyMTA2M2Y="
    //   );
    const media = [
        {
            media: 'https://content.svobodinaphoto.ru/1.jpg',
            caption: `
            Всем привет! Делюсь крутыми акциями от 2 классных фотостудий: обе делают аренду 800 рублей в час😱

Ссылки:
🐏 чтобы посмотреть интерьеры в 3 блоке https://vk.com/3blok
🐏 чтобы забронировать мистический 4 зал в Сканди https://instagram.com/scandi_photostudio?igshid=YmMyMTA2M2Y=
            
Думаю ссылка на меня не нужна, но если надо, то она на кнопке снизу слева😉`,
            type: 'photo'
        },
        {
            media: 'https://content.svobodinaphoto.ru/2.jpg',
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

        // try {
        //     await Promise.all(
        //         result.data.allUsers.data.map(async (e) => {
        //             await bot.telegram.sendMediaGroup(e.id, media)
        //         }))
        //     return {
        //         statusCode: 200,
        //         body: JSON.stringify({ message: "sending" }),
        //     };

        // } catch (error) {
        //     console.log(error);
        // }


        try {
            bot.telegram.sendMediaGroup(576118532, media)
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "sending" }),
            };
        } catch (error) {
            console.log(error);
        }



    } catch (e) {
        console.log(e);
        // return ctx.reply(`Что-то пошло не так`)
    }

};








