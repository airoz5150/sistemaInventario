// Importación de herramientas necesarias
import { useRouter } from "next/router"; // Hook para manejar navegación en Next.js
import axios from "axios"; // Biblioteca para realizar solicitudes HTTP
import Swal from "sweetalert2"; // Biblioteca para mostrar alertas personalizadas

// Definición y exportación del hook personalizado useAuth
export const useAuth = () => {
  // Instancia del enrutador de Next.js para realizar redirecciones
  const router = useRouter();

  // Función asíncrona para manejar el inicio de sesión
  const login = async (credenciales) => {
    try {
      // Realiza una solicitud POST al endpoint '/api/login' con las credenciales proporcionadas
      const response = await axios.post('/api/login', credenciales);

      // Verifica si el inicio de sesión fue exitoso
      if (response.data.success) {
        // Redirige al usuario a la página principal ('/Home') si las credenciales son correctas
        router.push('/Home');
      } else {
        // En caso de un error no manejado, puede agregarse lógica aquí (actualmente vacío)
      }
    } catch (error) {
      // Muestra una alerta en caso de error durante el inicio de sesión
      Swal.fire({
        title: 'Error!', // Título de la alerta
        text: error.response ? error.response.data.message : 'Ocurrió un error al intentar iniciar sesión.', // Mensaje de error
        icon: 'error', // Icono de error
        confirmButtonText: 'Intentar de nuevo' // Texto del botón de confirmación
      });

      // Muestra en la consola información adicional del error para depuración
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    }
  };

  // Devuelve la función `login` para que pueda ser utilizada en otros componentes
  return { login };
};
