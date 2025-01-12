// Importa los hooks necesarios, la librería SweetAlert2 para alertas y XLSX para manejar archivos Excel
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

// Definición del hook personalizado `useGenerateReport` que maneja la generación de reportes
const useGenerateReport = (apiURL) => {
  // Estados para manejar el estado de carga y errores
  const [loading, setLoading] = useState(false); // Estado que indica si se está generando el reporte
  const [error, setError] = useState(null); // Estado que maneja cualquier error ocurrido

  // Función principal que genera el reporte
  const imprimerReporte = async (id) => {
    setLoading(true); // Inicia el estado de carga
    setError(null); // Resetea cualquier error previo

    try {
      console.log(id); // Muestra el `id` en consola para depuración

       // Hace una solicitud `GET` a la API para obtener el reporte con el `id` proporcionado
      const response = await fetch(`/api/${apiURL}?id=${id}`, {
        method: 'GET',  // Método de la solicitud (GET)
        headers: {
          'Content-Type': 'application/json',    // Establece el encabezado indicando que se espera JSON
        },
      });

       // Si la respuesta no es válida (no tiene el código de estado `ok`), se lanza un error
      if (!response.ok) {
        throw new Error(`Error al obtener el reporte: ${response.statusText}`);
      }

      const result = await response.json();  // Convierte la respuesta a formato JSON
      console.log("Contenido de los reportes:", result);  // Muestra el contenido del reporte en consola

      // Verifica si el reporte es de inventario, en cuyo caso maneja los datos de manera especial
      if (apiURL === "inventoryReport") {
        if (!result || Object.keys(result).length === 0) {
          throw new Error("Los datos del reporte no son válidos o están vacíos");
        }

        // Crea un nuevo libro de trabajo para Excel
        const wb = XLSX.utils.book_new();

        // Recorremos las claves de 'result' y por cada una generamos una hoja
        const keys = Object.keys(result);
        keys.forEach(key => {
          const content = result[key];  // Obtiene el array correspondiente a la clave
          if (Array.isArray(content) && content.length > 0) {
            const arrayData = content.map(item => Object.values(item)); // Convertir contenido en array de valores

            // Agrega las cabeceras de la hoja (las claves de los objetos)
            const headers = Object.keys(content[0]);
            arrayData.unshift(headers); // Inserta las cabeceras al principio del array

            // Convierte el array en una hoja de Excel
            const ws = XLSX.utils.aoa_to_sheet(arrayData);
            XLSX.utils.book_append_sheet(wb, ws, key);// Añade la hoja al libro con el nombre de la clave
          }
        });

         // Crea el nombre del archivo con la fecha y hora actual, asegurando que los caracteres `:` y `.` se reemplazan
        const filename = `Reporte_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
        XLSX.writeFile(wb, filename); // Genera y descarga el archivo Excel

      } else {
        // Si no es un reporte de inventario, procesa los datos del campo 'contenido'
        if (!result || !Array.isArray(result.contenido)) {
          throw new Error("Los datos del reporte no son válidos o 'contenido' está vacío");
        }

        const filteredReportData = result.contenido;   // Filtra los datos para obtener solo el contenido
        console.log("IDs filtrados para obtener actividades:", filteredReportData);  // Muestra los datos filtrados en consola

        // Crea una hoja de Excel con los datos filtrados
        const ws = XLSX.utils.json_to_sheet(filteredReportData); // Convierte los datos en una hoja de Excel
        const wb = XLSX.utils.book_new(); /// Crea un libro de trabajo vacío
        XLSX.utils.book_append_sheet(wb, ws, "Reporte");  // Añade la hoja al libro con el nombre "Reporte"

        // Crea el nombre del archivo con la fecha y hora actual
        const filename = `Reporte_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
        XLSX.writeFile(wb, filename); // Genera y descarga el archivo Excel
      }

    } catch (error) {
      // Si ocurre un error en la solicitud o el procesamiento
      console.error('Hubo un error al conectar con la API:', error); // Muestra el error en consola
      setError(error.message); // Establece el mensaje de error en el estado
      Swal.fire({
        icon: 'error', // Muestra un ícono de error
        title: 'Error',  // Título del mensaje
        text: `Hubo un error al generar el reporte: ${error.message}`, // Texto con el mensaje de error
      });
    } finally {
      setLoading(false); // Finaliza el estado de carga, indicando que ya no se está procesando
    }
  };

 // Retorna la función `imprimerReporte` y los estados de carga y error
  return { imprimerReporte, loading, error };
};

// Exporta el hook para su uso en otros componentes
export default useGenerateReport;
