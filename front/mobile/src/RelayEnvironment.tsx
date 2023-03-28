/* eslint-disable prettier/prettier */
// your-app-name/src/RelayEnvironment.js
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {RequestParameters} from 'relay-runtime/lib/util/RelayConcreteNode';
import {Variables} from 'relay-runtime/lib/util/RelayRuntimeTypes';
import {REACT_APP_API_URL} from '@env';

async function fetchGraphQL(params: RequestParameters, variables: Variables) {
  const response = await fetch(`${REACT_APP_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });
  console.log(`@post ; ${JSON.stringify(response.headers)}`);

  return await response.json();
}

export default new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
});
