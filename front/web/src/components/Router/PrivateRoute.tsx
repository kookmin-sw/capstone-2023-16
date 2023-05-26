import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  access: boolean;
  Component: ReactElement
}

const PrivateRoute = ({access, Component}: PrivateRouteProps) => {
  return access ?
    Component
    : <Navigate to='/' />;
};

export default PrivateRoute;