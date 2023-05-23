import { GlobalStyles } from './styles/GlobalStyles';

import BackgroundLayout from './components/commons/BackgroundLayout';
import {RelayEnvironmentProvider} from 'react-relay';
import RelayEnvironment from './RelayEnvironment';
import { Suspense } from 'react';
import LoadingSpinnerPage from './pages/LoadingSpinnerPage';
import AppRouter from './components/Router/AppRouter';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AuthProvider>
        <BackgroundLayout>
          <GlobalStyles />
          <Suspense fallback={<LoadingSpinnerPage />}>
            <AppRouter />
          </Suspense>
        </BackgroundLayout>
      </AuthProvider>
    </RelayEnvironmentProvider>
  );  
}

export default App;
