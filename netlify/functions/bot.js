import { Telegraf } from "telegraf";
import { startAction } from "./actions/start"

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => {
    return startAction(ctx, bot)
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