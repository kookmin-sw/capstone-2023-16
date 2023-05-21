import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import LoginPage from './pages/LoginPage';
import MyPostsPage from './pages/MyPostsPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritingPage from './pages/PostWritingPage';
import BackgroundLayout from './components/commons/BackgroundLayout';
import {RelayEnvironmentProvider} from 'react-relay';
import RelayEnvironment from './RelayEnvironment';
import PersonaCreationPage from './pages/PersonaCreation/PersonaCreationPage';
import UserInfoPage from './pages/PersonaCreation/UserInfoPage';
import TagAndCategoryPage from './pages/PersonaCreation/TagAndCategoryPage';
import { Suspense } from 'react';
import LoadingSpinnerPage from './pages/LoadingSpinnerPage';
import SignUpPage from './pages/SignUpPage';
import MyPersonasPage from './pages/MyPersonasPage';
import RevenuePage from './pages/RevenuePage';
import StatisticsPage from './pages/StatisticsPage';
import PrivateRoute from './components/Router/PrivateRoute';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App = () => {
  const {auth} = useSelector((state: RootState) => state);
  
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <BackgroundLayout>
        <GlobalStyles />
        <Suspense fallback={<LoadingSpinnerPage />}>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/personas' element={<PrivateRoute access={auth.isLoggedIn} Component={<MyPersonasPage />} />} />
            <Route path='/posts' element={<PrivateRoute access={auth.isLoggedIn} Component={<MyPostsPage />} />} />
            <Route path='/post/:postId' element={<PrivateRoute access={auth.isLoggedIn} Component={<PostDetailPage />} />} /> 
            <Route path='/write' element={<PrivateRoute access={auth.isLoggedIn} Component={<PostWritingPage />} />} /> 
            <Route path='/post/edit/:postId' element={<PostWritingPage />} />
            <Route path='/create' element={<PersonaCreationPage />} >
              <Route path='' element={<UserInfoPage />} />
              <Route path='2' element={<TagAndCategoryPage />} />
            </Route>
            <Route path='/revenue' element={<PrivateRoute access={auth.isLoggedIn} Component={<RevenuePage />} />} /> 
            <Route path='/stats' element={<PrivateRoute access={auth.isLoggedIn} Component={<StatisticsPage />} />} /> 
          </Routes>
        </Suspense>
      </BackgroundLayout>
    </RelayEnvironmentProvider>
  );  
}

export default App;
