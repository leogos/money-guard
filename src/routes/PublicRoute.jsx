import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../redux/auth/authSelectors';

const PublicRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
