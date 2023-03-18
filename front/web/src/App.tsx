import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import PostChoice from './pages/PostChoice';
import LoginPage from './pages/LoginPage';
import PersonaChoice from './pages/PersonaChoicePage';
import MainLayout from './components/commons/MainLayout';

const App = () => {
  return (
    <MainLayout>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<PostChoice/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/persona' element={<PersonaChoice />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
