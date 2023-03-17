/* eslint-disable prettier/prettier */
// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text:string, variables: object) {
    // Fetch data from GitHub's GraphQL API:
    const response = await fetch('https://persona-backend.herokuapp.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    });
  
    // Get the response as JSON
    return await response.json();
  }
  
  export default fetchGraphQL;