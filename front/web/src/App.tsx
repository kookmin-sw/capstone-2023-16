import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import PostChoice from './pages/PostChoice';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/commons/MainLayout';
import useDeviceType from './hooks/useDeviceType';

const App = () => {
  const deviceType = useDeviceType();

  return (
    <MainLayout widthType={deviceType}>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<PostChoice/>} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
