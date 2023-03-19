import {REACT_APP_API_URL} from '@env';

/* eslint-disable prettier/prettier */
// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text: string, variables: object) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(`${REACT_APP_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
