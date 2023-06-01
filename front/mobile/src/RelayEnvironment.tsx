/* eslint-disable prettier/prettier */
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {RequestParameters} from 'relay-runtime/lib/util/RelayConcreteNode';
import {Variables} from 'relay-runtime/lib/util/RelayRuntimeTypes';
import {REACT_APP_API_URL} from '@env';
import { getData } from './asyncstorage';

async function FetchGraphQL(params: RequestParameters, variables: Variables) {
  const persona_id = await getData('persona_id');
  const cookie = await getData('cookie');
  console.log('persona_id: ', persona_id);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Persona-Id':`${persona_id}`,
    'Cookie': cookie,
  };

  const response = await fetch(`https://persona-backend.herokuapp.com/graphql`, {
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

  return await response.json();
}

export default new Environment({
  network: Network.create(FetchGraphQL),
  store: new Store(new RecordSource()),
});
