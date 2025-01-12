// Importación del hook useState para manejar el estado dentro del componente
import { useState } from "react";

// Definición y exportación del hook personalizado useLogin
export const useLogin = () => {
  // Estado inicial para las credenciales del usuario, con campos "correo" y "password"
  const [credenciales, setCredenciales] = useState({
    correo: '', // Inicialmente vacío para el correo
    password: '' // Inicialmente vacío para la contraseña
  });

  // Función para manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    setCredenciales({
      ...credenciales, // Mantenemos los valores actuales de las credenciales
      [e.target.name]: e.target.value // Actualizamos solo el campo que ha cambiado
    });
  };

  // Retornamos el estado de las credenciales y la función para manejar cambios
  return { credenciales, handleChange };
};
