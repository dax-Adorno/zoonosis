import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../config/axiosConfig'; // Importamos Axios

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  // Posición aleatoria del mosquito
  const [mosquitoPosition, setMosquitoPosition] = useState({ top: '10%', left: '10%' });

  useEffect(() => {
    const moveMosquito = () => {
      const newTop = Math.random() * 80 + '%'; // Genera un valor aleatorio entre 0% y 80%
      const newLeft = Math.random() * 80 + '%'; // Genera un valor aleatorio entre 0% y 80%
      setMosquitoPosition({ top: newTop, left: newLeft });
    };

    const intervalId = setInterval(moveMosquito, 2000); // Cambia la posición cada 2 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Formato de email inválido').required('El email es obligatorio'),
      password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post('/login', {
          email: values.email,
          password: values.password,
        }, {
          withCredentials: true
        });
        alert('Inicio de sesión exitoso: ' + JSON.stringify(response.data, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          alert('Error durante el inicio de sesión: ' + error.message);
        }
      }
    },
  });

  return (
    <div className="relative">
      {/* Icono del mosquito */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/7432/7432647.png"
        alt="Mosquito Icon"
        className="absolute w-12 h-12"
        style={{ top: mosquitoPosition.top, left: mosquitoPosition.left }}
      />
      <h1 className="text-2xl font-bold text-center mb-6 text-black">Iniciar Sesión</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
