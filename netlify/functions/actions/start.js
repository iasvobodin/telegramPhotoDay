export const startAction = async ctx => {

    if (ctx.from.is_bot) {
        return ctx.reply(`Sorry I only interact with humans!`)
    }

    try {
        const response = await fetch('https://graphql.fauna.com/graphql', {
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
        const result = await response.json();
        console.log(result, 'RESULT');
        if (result.errors) {
            return ctx.reply(`${ctx.from.username}, вы уже подписаны на рассылку`)
        } else {
            return ctx.reply(`Спасибо за подписку`)
        }

    } catch (e) {
        console.log(e);
        return ctx.reply(`Что-то пошло не так`)
    }

}