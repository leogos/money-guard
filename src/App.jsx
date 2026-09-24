import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { getCurrentUser } from './redux/auth/authOperations';
import {
  selectIsLoggedIn,
  selectToken,
} from './redux/auth/authSelectors';

import { PrivateRoute, PublicRoute } from './routes';

const LoginPage = lazy(() =>
  import('./pages/LoginPage/LoginPage')
);

const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage')
);

const DashboardPage = lazy(() =>
  import('./pages/DashboardPage/DashboardPage')
);

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token && isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, isLoggedIn]);

  return (
    <>
      <Toaster position="top-right" />

      <Suspense fallback={null}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
