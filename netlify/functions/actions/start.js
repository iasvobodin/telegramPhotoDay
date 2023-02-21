module.exports = async ctx => {
    console.log('start');
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

    } catch (e) {
        console.log(e);
        return ctx.reply(`Error occured`)
    }

}