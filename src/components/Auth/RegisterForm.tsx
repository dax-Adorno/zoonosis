import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../config/axiosConfig'; // Importamos Axios
import { useState, useEffect } from 'react';

interface TipoUsuario {
    id_tipo: number;
    nombre: string;
  }

interface RegisterFormValues {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  username: string;
  id_tipo: string;
  password: string;
  confirmPassword: string;
  fecha_nacimiento: string;
  celular: string;
  
}
//la constante tipo usuario u la funcion setTipousuario se declaran y se le dicen que van a ser un array
//
const RegisterForm: React.FC = () => {
    const [tiposUsuario, setTiposUsuario] = useState<TipoUsuario[]>([]);

    // Fetch de los tipos de usuario al cargar el componente
  useEffect(() => {
    const fetchTiposUsuario = async () => {
      try {
        //mediante axios coordino el endpoint tipos con el back por la url 
        const response = await api.get('/tipos'); // Petición a la endpoint
        setTiposUsuario(response.data); // Guardamos los tipos de usuario en el estado
      } catch (error) {
        console.error('Error al 🍆 Traer tipos de usuario:', error);
      }
    };

    fetchTiposUsuario();
  }, []);

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      username: '',
      id_tipo: '',
      password: '',
      confirmPassword: '',
      fecha_nacimiento: '',
      celular: '',
      
      
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      apellido: Yup.string().required('El apellido es obligatorio'),
      dni: Yup.string().required('El DNI es obligatorio'),
      email: Yup.string().email('Formato de email inválido').required('El email es obligatorio'),
      username: Yup.string().required('El nombre de usuario es obligatorio'),
      id_tipo: Yup.string().required('Debe seleccionar un tipo de usuario'), // Validación para id_tipo
      password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Las contraseñas deben coincidir')
        .required('La confirmación de contraseña es obligatoria'),
      fecha_nacimiento: Yup.date().required('La fecha de nacimiento es obligatoria'),
      celular: Yup.string().required('El número de celular es obligatorio'),
    }),
    onSubmit: async (values) => {
      try {
        // Hacemos la petición POST para registrar al usuario
        const response = await api.post('/auth/register', values);
        alert('Registro exitoso: ' + JSON.stringify(response.data, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          alert('Error durante el registro: ' + error.message);
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Registrar Usuario</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Dividimos el formulario en dos columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna 1 */}
            <div>
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
                <input
                  id="nombre"
                  type="text"
                  {...formik.getFieldProps('nombre')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="text-red-500">{formik.errors.nombre}</div>
                ) : null}
              </div>
  
              <div className="mb-4">
                <label htmlFor="apellido" className="block text-gray-700">Apellido:</label>
                <input
                  id="apellido"
                  type="text"
                  {...formik.getFieldProps('apellido')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.apellido && formik.errors.apellido ? (
                  <div className="text-red-500">{formik.errors.apellido}</div>
                ) : null}
              </div>
  
              <div className="mb-4">
                <label htmlFor="dni" className="block text-gray-700">DNI:</label>
                <input
                  id="dni"
                  type="text"
                  {...formik.getFieldProps('dni')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.dni && formik.errors.dni ? (
                  <div className="text-red-500">{formik.errors.dni}</div>
                ) : null}
              </div>
  
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
                <label htmlFor="username" className="block text-gray-700">Nombre de usuario:</label>
                <input
                  id="username"
                  type="text"
                  {...formik.getFieldProps('username')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500">{formik.errors.username}</div>
                ) : null}
              </div>
            </div>
  
            {/* Columna 2 */}
            <div>
              <div className="mb-4">
                <label htmlFor="id_tipo" className="block text-gray-700">Tipo de Usuario:</label>
                <select
                  id="id_tipo"
                  {...formik.getFieldProps('id_tipo')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccionar Tipo</option>
                  {tiposUsuario.map((tipo) => (
                    <option key={tipo.id_tipo} value={tipo.id_tipo}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
                {formik.touched.id_tipo && formik.errors.id_tipo ? (
                  <div className="text-red-500">{formik.errors.id_tipo}</div>
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
  
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar contraseña:</label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="text-red-500">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
  
              <div className="mb-4">
                <label htmlFor="fecha_nacimiento" className="block text-gray-700">Fecha de nacimiento:</label>
                <input
                  id="fecha_nacimiento"
                  type="date"
                  {...formik.getFieldProps('fecha_nacimiento')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.fecha_nacimiento && formik.errors.fecha_nacimiento ? (
                  <div className="text-red-500">{formik.errors.fecha_nacimiento}</div>
                ) : null}
              </div>
  
              <div className="mb-4">
                <label htmlFor="celular" className="block text-gray-700">Celular:</label>
                <input
                  id="celular"
                  type="text"
                  {...formik.getFieldProps('celular')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.celular && formik.errors.celular ? (
                  <div className="text-red-500">{formik.errors.celular}</div>
                ) : null}
              </div>
            </div>
          </div>
  
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
