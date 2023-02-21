// const { Telegraf } = require('telegraf')
// const startAction = require('./actions/start')

import { Telegraf } from "telegraf";
import startAction from "./actions/start"

const bot = new Telegraf(process.env.BOT_TOKEN);
// ctx.from {
//     id: 576118532,
//         is_bot: false,
//             first_name: 'Ivan',
//                 last_name: 'Svobodin',
//                     username: 'iasvobodin',
//                         language_code: 'ru'
// }
bot.start(ctx => {
    console.log(ctx.message.chat, 'chat', ctx.message.from, 'CTX FROM');
    return startAction(ctx)
})
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));

exports.handler = async event => {
    try {
        await bot.handleUpdate(JSON.parse(event.body));
        return { statusCode: 200, body: '' };
    } catch (e) {
        console.log(e)
        return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
    }

}