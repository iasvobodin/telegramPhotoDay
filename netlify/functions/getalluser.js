exports.handler = async function (event, context) {
    const response = await fetch('https://graphql.fauna.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FAUNA_SECRET_KEY}`
        },
        body: JSON.stringify({
            query: `
              query FindAllTodos {
                  allTodos {
                      data {
                          title
                          completed
          }
        }
      }
            `,
        }),
    })
    const result = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(result.data),
    };
};


