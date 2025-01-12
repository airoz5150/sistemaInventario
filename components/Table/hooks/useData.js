// Importa los hooks `useState` y `useEffect` de React para gestionar el estado y efectos secundarios
import { useState, useEffect } from 'react';

// Definición del hook personalizado `useData` que maneja la obtención de datos desde una API y filtrado.
const useData = (apiURL, searchTerm = '') => {
    // Inicializa el estado `data` como un array vacío, este estado almacenará los datos obtenidos de la API.
    const [data, setData] = useState([]);
     // Inicializa el estado `loading` como `false`, este estado indicará si los datos están siendo cargados.
  const [loading, setLoading] = useState(false);

   // Función `fetchData` para obtener los datos de la API
  const fetchData = async () => {
    setLoading(true);   // Establece el estado `loading` como `true` al iniciar la obtención de datos.

     // Si la URL de la API es "activities", realiza un proceso específico para esta URL
    if (apiURL === "activities") {
      try {
        const response = await fetch(`/api/${apiURL}`);  // Realiza una solicitud GET a la API.
        const result = await response.json();  // Parsea la respuesta de la API como JSON.

        if (result && result.data) { // Si hay datos en la respuesta
           // Filtra los datos, excluyendo ciertos campos y ajustando el formato de `userName`
          const filteredData = result.data.map(({ id_activities, createdBy, __v
            , ...rest }) => {
            // Check if the user object exists and is not undefined
            if (rest.user || rest.user === null) {
               // Si el usuario es null, asigna un nombre por defecto, de lo contrario asigna el `nombreCompleto`
              if (rest.user === null) {
                rest.userName = "Sin usuario asignado"
              } else {

                rest.userName = String(rest.user.nombreCompleto); // Convierte `nombreCompleto` a cadena
              } 
              delete rest.user;  // Elimina el campo `user` del objeto
            }
            return rest; // Retorna el objeto con las modificaciones
          });

          console.log(filteredData);  // Muestra los datos filtrados para depuración

          setData(filteredData); // Actualiza el estado `data` con los datos filtrados
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error); // Muestra un error si la solicitud falla
      } finally {
        setLoading(false);
      }
        // Si la URL de la API es "reports" o "inventoryReport", realiza un proceso específico para estos casos
    } else if  (apiURL === "reports"||apiURL === "inventoryReport") {
      try {
        const response = await fetch(`/api/${apiURL}`);  // Realiza la solicitud GET
        const result = await response.json();  // Parsea la respuesta como JSON

        if (result && result.data) { // Si hay datos en la respuest
          // Filtra los datos, excluyendo ciertos campos y ajustando el formato de `userName`
          const filteredData = result.data.map(({ updatedAt, __v, contenidoEquipments,
            contenidoMoviles, contenidoTelefonica, contenidoMouse, contenidoBocinas,
            contenidoReguladores, contenidoTeclado, contenidoMonitores, ...rest }) => {
            
            if (rest.createdBy ) { // Si existe el campo `createdBy`
                rest.userName = String(rest.createdBy.nombreCompleto);
               
              delete rest.createdBy;  // Elimina el campo `createdBy`
            }
            return rest; // Retorna el objeto con las modificaciones
          });

          // Muestra los datos filtrados para depuración
          console.log(filteredData);
          setData(filteredData); // Actualiza el estado `data` con los datos filtrados
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error); // Muestra un error si la solicitud falla
      } finally {
        setLoading(false); // Establece `loading` a `false` después de obtener los datos
      }
    }   // Si la URL de la API no es "activities", "reports", o "inventoryReport", realiza un proceso genérico
    else {
      try {
        const response = await fetch(`/api/${apiURL}`); // Realiza la solicitud GET
        const result = await response.json(); // Parsea la respuesta como JSON
        if (result && result.data) {  // Si hay datos en la respuesta
          console.log(result.data); // Muestra los datos obtenidos para depuración
          // Filtra los datos excluyendo ciertos campos
          const filteredData = result.data.map(({
            id_activities, id_area, id_equipment,updatedAt, __v, contenidoEquipments,
            contenidoMoviles, contenidoTelefonica, contenidoMouse, contenidoBocinas,
            contenidoReguladores, contenidoTeclado, contenidoMonitores, profileImg, ...rest
          }) => rest);
          setData(filteredData);  // Actualiza el estado `data` con los datos filtrados
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error); // Muestra un error si la solicitud falla
      } finally {
        setLoading(false);  // Establece `loading` a `false` después de obtener los datos
      }
    };

  }
  // El `useEffect` ejecuta `fetchData` cuando cambia la URL de la API
  useEffect(() => {
    fetchData();  // Llama a la función para obtener los datos al iniciar o cuando cambia `apiURL`
  }, [apiURL]);  // Dependencia de `apiURL`, la función se ejecutará cada vez que `apiURL` cambie

 // Filtra los datos según el `searchTerm`, verificando si alguna clave del objeto contiene el término de búsqueda
  const filteredData = data.filter(item =>
    Object.keys(item).some(key =>
      String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())  // Filtra para que coincida el `searchTerm` en cualquier campo
    )
  );

 // Devuelve el estado de los datos (`data` y `filteredData`), el estado de carga (`loading`), y las funciones `setData` y `fetchData`
  return { data, filteredData, loading, setData, fetchData };
};

export default useData;  // Exporta el hook `useData` para que pueda ser utilizado en otros componentes
