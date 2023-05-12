/* eslint-disable prettier/prettier */
// your-app-name/src/RelayEnvironment.js
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {RequestParameters} from 'relay-runtime/lib/util/RelayConcreteNode';
import {Variables} from 'relay-runtime/lib/util/RelayRuntimeTypes';
import {REACT_APP_API_URL} from '@env';

async function FetchGraphQL(params: RequestParameters, variables: Variables) {
  console.log('URL:', REACT_APP_API_URL);

  const response = await fetch(`${REACT_APP_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    mode: 'cors',
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });
  console.log(`@post1 ; ${JSON.stringify(response.headers)}`);
  console.log(`@post2 ; ${response.headers.get('set-cookie')}`);
  console.log(`@post3 ; ${JSON.stringify(response)}`);

  return await response.json();
}

export default new Environment({
  network: Network.create(FetchGraphQL),
  store: new Store(new RecordSource()),
});
