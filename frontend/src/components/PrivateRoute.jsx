import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './Home/Navbar';
function PrivateRoute({ allowrole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();
  console.log(location.pathname);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowrole.includes(role)) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      {location.pathname === '/dashboard' ? null : <Navbar />}
      <Outlet />
    </>
  );
}

export default PrivateRoute;
