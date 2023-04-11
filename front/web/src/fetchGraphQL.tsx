async function fetchGraphQL(text:string, variables: object) {
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

  return await response.json();
}

export default fetchGraphQL;