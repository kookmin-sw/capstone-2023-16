/* eslint-disable prettier/prettier */
import React from 'react';
import NavContainer from './navigation/NavContainer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import { RelayEnvironmentProvider } from 'react-relay';
import RelayEnvironment from './RelayEnvironment';
export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavContainer />
          </PersistGate>
        </Provider>
      </RelayEnvironmentProvider>
    </GestureHandlerRootView>
  );
}
