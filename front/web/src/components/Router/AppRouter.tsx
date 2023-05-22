import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ServiceRouter from './ServiceRouter';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import PrivateRoute from './PrivateRoute';
import { RootState } from '../../redux/store';

const AppRouter = () => {
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);
  
  return (<Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
    
        <Route path='*' element={<PrivateRoute access={isLoggedIn} Component={<ServiceRouter />} />} />
    </Routes>
  );  
}

export default AppRouter;
