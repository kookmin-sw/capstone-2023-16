import { Routes, Route } from 'react-router-dom';
import ServiceRouter from './ServiceRouter';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../../context/AuthContext';

const AppRouter = () => {
  const context = useAuth();
  
  return (<Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
    
        <Route path='*' element={<PrivateRoute access={context.loginState} Component={<ServiceRouter />} />} />
    </Routes>
  );  
}

export default AppRouter;
