// src/config/axiosConfig.ts
import axios from 'axios';

// Configuramos la URL base de la API ( cambiar cuando este listo el servidor)
const api = axios.create({
  baseURL: 'http://localhost:3000', // esto va con la url de la api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
