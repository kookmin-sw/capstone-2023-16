import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import PostChoice from './pages/PostChoice';
import Layout from './components/commons/MainLayout';

const App = () => {

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<PostChoice/>} />
        <Route path='/signUp' element={<Layout>테스트 문구입니다.</Layout>} />
      </Routes>
    </>
  );
}

export default App;
