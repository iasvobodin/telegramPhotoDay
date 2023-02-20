// const { newUser } = require('../components/fauna')
import { getUser } from "../components/helper";

module.exports = async ctx => {
    // console.log(ctx.from, 'ctx.from');
    const { id, isBot, name } = getUser(ctx.from)
    // console.log(id, isBot, name, 'from start.js')

    if (isBot) {
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
            mutation CreateATodo {

                createTodo(data: {
             
                title: "${id} ${name}"
             
                completed: false
             
                }) {
             
                title   completed
                }
             
             }
            `,
            }),
        })
        return ctx.reply(`Added ${name} to db!`)
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

}