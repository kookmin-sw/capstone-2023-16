/* eslint-disable prettier/prettier */
import React from 'react';
import NavContainer from './navigation/NavContainer';
import {RelayEnvironmentProvider} from 'react-relay';
import RelayEnvironment from './RelayEnvironment';

export default function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <NavContainer />
    </RelayEnvironmentProvider>
  );
}
