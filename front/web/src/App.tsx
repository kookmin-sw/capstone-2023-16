import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import PostChoice from './pages/PostChoice';
import LoginPage from './pages/LoginPage';
import PersonaChoice from './pages/PersonaChoicePage';
import TitleLayout from './components/commons/TitleLayout';

const App = () => {
  return (
    <TitleLayout>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<PostChoice/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/persona' element={<PersonaChoice />} />
      </Routes>
    </TitleLayout>
  );
}

export default App;
