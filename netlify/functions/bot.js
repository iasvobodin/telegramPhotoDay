// const { Telegraf } = require('telegraf')
// const startAction = require('./actions/start')

import { Telegraf } from "telegraf";
// import startAction from "./actions/start"

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async ctx => {
    if (ctx.from.is_bot) {
        return ctx.reply(`Sorry I only interact with humans!`)
    }

    try {
        await fetch('https://graphql.fauna.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FAUNA_SECRET_KEY}`
            },
            body: JSON.stringify({
                query: `
                    mutation CreateUser {
                        createUser(data: {
                           id: "${ctx.from.id}" 
                           is_bot: ${ctx.from.is_bot}
                           first_name: "${ctx.from.first_name}"
                           last_name: "${ctx.from.last_name}"
                           username: "${ctx.from.username}"
                           language_code: "${ctx.from.language_code}"
                       }){
                            id
                        }
                     }
                `,
            }),
        })
        return ctx.reply(`Added ${ctx.from.username} to db!`)
        // const result = await response.json();
        //     let isNewUser = await newUser(id)
        //     if (isNewUser) {
        //         return ctx.reply(`Added ${name} to db!`)
        //     } else {
        //         return ctx.reply(`${name} is already inside db!`)
        //     }

    } catch (e) {
        console.log(e);
        return ctx.reply(`Error occured`)
    }
})
exports.handler = async event => {
    console.log(event.body, "event.body");
    try {
        await bot.handleUpdate(JSON.parse(event.body));
        bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
        return { statusCode: 200, body: '' };
    } catch (e) {
        console.log(e)
        return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
    }

}