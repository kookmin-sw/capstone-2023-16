/* eslint-disable prettier/prettier */
import React from 'react';
import NavContainer from './navigation/NavContainer';
import {RelayEnvironmentProvider} from 'react-relay';
import RelayEnvironment from './RelayEnvironment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <NavContainer />
      </RelayEnvironmentProvider>
    </GestureHandlerRootView>
  );
}
