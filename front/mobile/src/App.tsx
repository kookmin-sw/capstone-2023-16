/* eslint-disable prettier/prettier */
import React from 'react';
import NavContainer from './navigation/NavContainer';

import {RelayEnvironmentProvider} from 'react-relay';
import RelayEnvironment from './RelayEnvironment';

import {Provider} from 'react-redux';
import {store} from './redux/store';
export default function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Provider store={store}>
        <NavContainer />
      </Provider>
    </RelayEnvironmentProvider>
  );
}
