// Importa useState desde React, Swal para las alertas, y otros hooks personalizados (useAuth y useData)
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from './useAuth';
import useData from './useData';

// Hook personalizado que genera un reporte basado en las API proporcionadas
const useGenerateReport = (apiReports, apiURL, searchTerm) => {
   // Estado que maneja la carga del reporte (si se está generando)
  const [loadingReport, setLoading] = useState(false); 
   // Llamada al hook useData para obtener los datos filtrados según apiURL y searchTerm
  const { fetchData } = useData(apiURL, searchTerm);

    // Extrae el id del usuario desde el hook useAuth
  const {id} = useAuth()
   // Función que retorna la fecha y hora formateada para ser usada como nombre de archivo
  const getFormattedDate = () => {
    const currentDate = new Date(); // Obtiene la fecha y hora actual
    const day = String(currentDate.getDate()).padStart(2, '0'); // Día en formato DD
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Mes en formato MM (agregamos 1 porque los meses empiezan desde 0)
    const year = currentDate.getFullYear(); // Año en formato YYYY
    const hours = String(currentDate.getHours()).padStart(2, '0'); // Hora en formato HH
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Minutos en formato MM
    return `Report_${apiReports}:${day}-${month}-${year}_${hours}:${minutes}`;  // Retorna un string con la fecha y hora formateada
  };

    // Función que genera el reporte cuando es llamada
  const handleGenerateReport = async () => {
    setLoading(true); // Marca el inicio de la generación del reporte

    try {
     // Inicializa el objeto para almacenar los datos del reporte cuando se trata de "activities"
      const reportDataActivities = {
        title: getFormattedDate(), // Asigna el título con la fecha y hora actual
        contenido: [], // Este array se llenará con los datos filtrados
        createdBy: id, // Asigna el ID del usuario que genera el reporte
      };

       // Inicializa el objeto para almacenar los datos de varios tipos de reporte
      const reportData = {
        title: getFormattedDate(),  // Título con la fecha y hora
        contenidoEquipments: [],  // Datos de equipos
        contenidoMoviles: [],   // Datos de móviles
        contenidoTelefonica: [],  // Datos de telefonía
        contenidoMouse: [],   // Datos de mouse
        contenidoBocinas: [],  // Datos de bocinas
        contenidoReguladores: [],  // Datos de reguladores
        contenidoMonitores: [],  // Datos de monitores
        contenidoTeclado: [],  // Datos de teclados
        createdBy: id,  // Usuario que genera el reporte
      };

       // Si la API de reporte es "activities", se utiliza `reportDataActivities`
      if (apiReports === "activities") {
         // Realiza la solicitud para obtener los datos de la API de actividades
        const response = await fetch(`/api/${apiReports}`);
        if (!response.ok) {  // Si la respuesta no es correcta, lanza un error
          throw new Error(`Error al obtener los datos de la API: ${response.statusText}`);
        }
        const result = await response.json(); // Convierte la respuesta en JSON
        
         // Si la respuesta contiene datos, filtra los datos según el término de búsqueda (searchTerm)
        if (result && result.data) {
          // Filtrar los datos
          const dataReportFiltered = result.data.filter((item) =>
            Object.keys(item).some((key) => {
              // Asegurarse de que item[key] sea un valor válido
              const value = item[key] !== undefined && item[key] !== null ? String(item[key]) : ''; 
          
              // Asegurarse de que searchTerm sea una cadena válida
              const searchValue = searchTerm ? searchTerm.toLowerCase() : ''; 
          
             // Compara el valor con el término de búsqueda
              return value.toLowerCase().includes(searchValue);
            })
          );

          // Si no hay datos para exportar, muestra una advertencia
          if (dataReportFiltered.length === 0) {
            Swal.fire({
              icon: 'warning',
              title: 'No hay datos para exportar',
              text: 'No se encontraron datos en la tabla para generar el reporte.',
            });
            return;
          }

          // Asignar los datos al objeto reportDataActivities
          reportDataActivities.contenido = dataReportFiltered.map(item => item._id);
        } else {
          console.error("La respuesta del servidor no contiene datos válidos:", result);
          return;
        }

        // Enviar los datos a la API para crear el reporte
        const saveResponse = await fetch(`/api/${apiURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reportDataActivities),  // Usar reportDataActivities
        });

        const saveResult = await saveResponse.json();
        if (saveResponse.ok) {
          console.log("Reporte guardado en la base de datos:", saveResult);

        } else {
          console.error("Error al guardar el reporte:", saveResult);
        }

      } else {
        // Si apiReports no es "activities", hacer fetch a múltiples APIs
        const apiUrls = [
          `/api/${apiReports}`, // API principal
          `/api/moviles`,       // API para móviles
          `/api/telefonica`,    // API para telefonía
          `/api/mouse`,         // API para mouse
          `/api/bocina`,        // API para bocinas
          `/api/reguladores`,   // API para reguladores
          `/api/monitor`,       // API para monitores
          `/api/teclado`,       // API para teclados
        ];

         // Realiza todas las solicitudes en paralelo
        const fetchResponses = await Promise.all(
          apiUrls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) { // Si alguna respuesta no es válida, lanza un error
              throw new Error(`Error al obtener los datos de la API ${url}: ${response.statusText}`);
            }
            return await response.json(); // Retorna los datos en formato JSON
          })
        );

        // Asigna los datos filtrados a las propiedades correspondientes en reportData
        fetchResponses.forEach((result, index) => {
          if (result && result.data) {
            const dataReportFiltered = result.data.filter((item) =>
              Object.keys(item).some((key) => {
                // Asegurarse de que item[key] sea un valor válido
                const value = item[key] !== undefined && item[key] !== null ? String(item[key]) : ''; 
            
                // Asegurarse de que searchTerm sea una cadena válida
                const searchValue = searchTerm ? searchTerm.toLowerCase() : ''; 
            
                // Compara el valor con searchTerm, ambos convertidos a minúsculas
                return value.toLowerCase().includes(searchValue);
              })
            );
  // Dependiendo del índice de la respuesta, asigna los datos filtrados a la propiedad correspondiente
            switch (index) {
              case 0:
                reportData.contenidoEquipments = dataReportFiltered.map(item => item._id);
                break;
              case 1:
                reportData.contenidoMoviles = dataReportFiltered.map(item => item._id);
                break;
              case 2:
                reportData.contenidoTelefonica = dataReportFiltered.map(item => item._id);
                break;
              case 3:
                reportData.contenidoMouse = dataReportFiltered.map(item => item._id);
                break;
              case 4:
                reportData.contenidoBocinas = dataReportFiltered.map(item => item._id);
                break;
              case 5:
                reportData.contenidoReguladores = dataReportFiltered.map(item => item._id);
                break;
              case 6:
                reportData.contenidoMonitores = dataReportFiltered.map(item => item._id);
                break;
              case 7:
                reportData.contenidoTeclado = dataReportFiltered.map(item => item._id);
                break;
              default:
                break;
            }
          }
        });

        // Verificar si alguna propiedad está vacía
        console.log(reportData);
        if (Object.values(reportData).some(arr => arr.length === 0)) {
          Swal.fire({
            icon: 'warning',
            title: 'No hay datos para exportar',
            text: 'No se encontraron datos en alguna de las categorías del reporte.',
          });
          return;
        }

        // Enviar los datos al servidor
        const saveResponse = await fetch(`/api/${apiURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reportData),
        });

        const saveResult = await saveResponse.json();
        if (saveResponse.ok) {
          console.log("Reporte guardado en la base de datos:", saveResult);
          
        } else {
          console.error("Error al guardar el reporte:", saveResult);
        }
      }

    } catch (error) {
      console.error("Error al obtener los datos:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Ocurrió un error al generar el reporte: ${error.message}`,
      });
    } finally {
      setLoading(false);  // Finaliza el proceso de carga
    }
  };
  // Retorna la función para generar el reporte y el estado de carga
  return { handleGenerateReport, loadingReport };
};

// Exporta el hook personalizado
export default useGenerateReport;
