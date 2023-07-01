export const getUsers = async () => {
    try {
        const response = await fetch('https://graphql.fauna.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FAUNA_SECRET_KEY}`
            },
            body: JSON.stringify({
                query: `
        query FindAllUsers {
            allUsers {
              data {
                  first_name
                  last_name
                  username
                  id
              }
            }
          }
    `,
            }),
        })
        const result = await response.json();

        console.log(result.data.allUsers.data, "result");

        return result.data.allUsers.data
    } catch (error) {
        console.log(error);
    }
}