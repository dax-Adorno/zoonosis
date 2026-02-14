import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] min-w-[100vw] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg">
        <RegisterForm />
      </div>
    </div>
  );
};


export default RegisterPage;
