/* eslint-disable prettier/prettier */
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {RequestParameters} from 'relay-runtime/lib/util/RelayConcreteNode';
import {Variables} from 'relay-runtime/lib/util/RelayRuntimeTypes';
import {REACT_APP_API_URL} from '@env';
import { storeData } from './asyncstorage';

async function LoginFetchGraphQL(params: RequestParameters, variables: Variables) {
  console.log('URL:', REACT_APP_API_URL);

  const response = await fetch(`https://persona-backend.herokuapp.com/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });
  console.log(`@post1 ; ${JSON.stringify(response.headers)}`);
  storeData('cookie', response.headers.get('set-cookie'));

  return await response.json();
}

export default new Environment({
  network: Network.create(LoginFetchGraphQL),
  store: new Store(new RecordSource()),
});
