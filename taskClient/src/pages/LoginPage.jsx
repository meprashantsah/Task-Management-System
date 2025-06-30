import React from 'react';
import Login from '../components/Auth/Login';

const LoginPage = ({ setToken }) => {
  return (
    <div>
      <Login onLogin={setToken} />
    </div>
  );
};

export default LoginPage;
