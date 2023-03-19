import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import PostChoice from './pages/PostChoice';
import LoginPage from './pages/LoginPage';
import PersonaChoice from './pages/PersonaChoice';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<PostChoice/>} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
