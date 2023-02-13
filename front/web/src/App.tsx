import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<div>로그인페이지(홈)</div>} />
        <Route path='/signUp' element={<div>회원가입페이지</div>} />
      </Routes>
    </>
  );
}

export default App;
