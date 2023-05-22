/* eslint-disable prettier/prettier */
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {RequestParameters} from 'relay-runtime/lib/util/RelayConcreteNode';
import {Variables} from 'relay-runtime/lib/util/RelayRuntimeTypes';
import {REACT_APP_API_URL} from '@env';
import {getData} from './asyncstorage';

async function FetchGraphQL(params: RequestParameters, variables: Variables) {
  const persona_id = await getData('persona_id');
  console.log('persona_id: ', persona_id);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Persona-Id': persona_id,
  };

  const response = await fetch(`${REACT_APP_API_URL}/graphql`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: headers,
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
