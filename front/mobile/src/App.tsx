/* eslint-disable prettier/prettier */
import React from 'react';
import NavContainer from './navigation/NavContainer';

import {RelayEnvironmentProvider} from 'react-relay';
import RelayEnvironment from './RelayEnvironment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {Provider} from 'react-redux';
import {store} from './redux/store';
export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Provider store={store}>
          <NavContainer />
        </Provider>
      </RelayEnvironmentProvider>
    </GestureHandlerRootView>
  );
}
