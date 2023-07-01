import { Telegraf, Markup } from "telegraf";
import { startAction } from "./actions/start"
import { getUsers } from "./actions/getUsers";
import { message } from 'telegraf/filters'
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => {
    return startAction(ctx, bot)
})
// bot.command("onetime", ctx =>
//     ctx.reply(
//         "One time keyboard",
//         Markup.keyboard(["/simple", "/inline", "/pyramid"]).oneTime().resize(),
//     ),
// );
// svid 576118532
bot.on(message("text"), async (ctx) => {
    if (ctx.message.chat.id === 397739262) {

        if (ctx.message.text.startsWith('Рассылка ')) {
            const media = ctx.message.text.replace('Рассылка ', '')

            // const users = await getUsers()

            // try {
            //     await Promise.all(
            //         users.map(async (e) => {
            //             await bot.telegram.sendMessage(e.id, media)
            //         }))
            // } catch (error) {
            //     console.log(error);
            // }
            ctx.reply(media)
        }
        // ctx.reply(ctx.message.text)  
        // try {
        //     const link = await ctx.telegram.getFileLink(ctx.message.document.file_id)
        //     await ctx.reply(JSON.stringify(link, null, 2))
        // } catch (error) {
        //     console.log(error);
        // }
    }

})


bot.hears('пользователи', async (ctx) => {
    if (ctx.message.chat.id === 397739262) {
        //message from Nastya
        try {
            const users = await getUsers()
            await ctx.reply(JSON.stringify(users, null, 2))
        } catch (error) {
            console.log(error);
        }
    }
})


bot.telegram.getWebhookInfo(async ctx => {
    console.log(ctx, 'fromWebhookinfo');
})


export async function handler(event) {
    try {
        await bot.handleUpdate(JSON.parse(event.body));
        return { statusCode: 200, body: '' };
    } catch (e) {
        console.log(e)
        return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
    }

}