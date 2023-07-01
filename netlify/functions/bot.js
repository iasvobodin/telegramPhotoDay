import { Telegraf, Markup } from "telegraf";
import { startAction } from "./actions/start"
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

bot.on(message("document"), async (ctx) => {
    if (ctx.message.chat.id === 576118532) {
        try {
            const link = await ctx.telegram.getFileLink(ctx.message.document.file_id)
            await ctx.reply(JSON.stringify(link, null, 2))
        } catch (error) {
            console.log(error);
        }
    }

})


bot.hears('жопа', (ctx) => {
    return ctx.reply("сама жопа")
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