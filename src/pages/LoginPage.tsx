import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-beige grid place-items-center">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg relative">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
