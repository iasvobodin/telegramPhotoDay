const { newUser } = require('../components/fauna')
const { getUser } = require('../components/helper')

module.exports = async ctx => {
    console.log(ctx.botInfo, 'ctx.from');
    const { id, isBot, name } = getUser(ctx.botInfo)
    console.log(id, isBot, name, 'from start.js')

    if (isBot) {
        return ctx.reply(`Sorry I only interact with humans!`)
    }

    try {
        let isNewUser = await newUser(id)
        if (isNewUser) {
            return ctx.reply(`Added ${name} to db!`)
        } else {
            return ctx.reply(`${name} is already inside db!`)
        }

    } catch (e) {
        return ctx.reply(`Error occured`)
    }

}