import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import LoginPage from './pages/LoginPage';
import PersonaChoice from './pages/PersonaChoicePage';
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

const App = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <BackgroundLayout>
        <GlobalStyles />
        <Suspense fallback={<LoadingSpinnerPage />}>
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/personas' element={<PersonaChoice />} />
            <Route path='/posts' element={<MyPostsPage />} />
            <Route path='/post/:postId' element={<PostDetailPage />} />
            <Route path='/post/edit' element={<PostWritingPage />} />
            <Route path='/post/edit/:postId' element={<PostWritingPage />} />
            <Route path='/create' element={<PersonaCreationPage />} >
              <Route path='' element={<UserInfoPage />} />
              <Route path='2' element={<TagAndCategoryPage />} />
            </Route>
          </Routes>
          </Suspense>
      </BackgroundLayout>
    </RelayEnvironmentProvider>
  );  
}

export default App;
