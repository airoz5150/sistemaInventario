import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// Definición del hook personalizado `useAuth` para gestionar la autenticación de usuario
const useAuth = () => {
   // Inicializa el estado `id` como `null`. Este estado almacenará el ID del usuario decodificado del token.
  const [id, setId] = useState(null); 
  const [userName, setUserName] = useState(null);  // Inicializa el estado `userName` como `null`. Este estado almacenará el nombre del usuario.
  const [correo, setCorreo] = useState(null);    // Inicializa el estado `correo` como `null`. Este estado almacenará el correo del usuario.

   // useEffect se ejecuta una vez cuando el componente se monta o cuando los estados de `id`, `correo` o `userName` cambian
  useEffect(() => {
    // Obtiene el valor del token almacenado en las cookies del navegador
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
 // Si hay un token y `id` es null (para evitar la recodificación del token una vez ya esté decodificado)
    if (token && !id) {
  // Decodifica el token para obtener el contenido del JWT, como el ID, correo y nombre de usuario
   const decodedToken = jwtDecode(token);
      setId(decodedToken.id); // Establece el `id` del usuario decodificado en el estado
      setCorreo(decodedToken.correo);// Establece el `correo` del usuario decodificado en el estado
      setUserName(decodedToken.userName);// Establece el `userName` del usuario decodificado en el estado
         // Muestra en la consola el `id`, `correo` y `userName` decodificados del token
      console.log('ID decodificado:', decodedToken.id); 
      console.log('Correo:', decodedToken.correo);   
      console.log('Nombre:', decodedToken.userName);  
    }
  }, [id,correo,userName]); // El hook `useEffect` depende de `id`, `correo` y `userName`, y se ejecuta cuando alguno de estos cambia

   // Devuelve los valores de `id`, `correo` y `userName` para que puedan ser utilizados por otros componentes
  return { id,correo,userName };
};

 // Exporta el hook `useAuth` para que pueda ser utilizado en otros componentes
export default useAuth;
