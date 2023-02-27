import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import PostChoice from './pages/PostChoice';

const App = () => {

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<PostChoice/>} />
        <Route path='/signUp' element={<div>회원가입페이지</div>} />
      </Routes>
    </>
  );
}

export default App;
