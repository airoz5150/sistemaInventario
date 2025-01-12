import React, { useEffect, useState } from "react"; // Importa React y hooks useEffect, useState
import GlobalStyle from "../../../../components/globalStyle/GlobalStyle"; // Importa los estilos globales
import NavBar from "../../../../components/NavBar/Navbar"; // Importa la barra de navegación
import EmployeeCard from "../../../../components/Card"; // Importa el componente de tarjeta para mostrar empleados (aunque no se usa en este código)
import useGeneratePDF from "../../hook/generatePDF"; // Importa el hook personalizado para generar PDFs
import Table from "../../../../components/Table/Table"; // Importa el componente de tabla para mostrar datos
import styled from "styled-components";


const StyledContainer=styled.div`

@media (max-width: 1068px){
justify-self: right;
flex-direction: column;
}

`

export default function ModalNewReports() {
  // Desestructura el hook useGeneratePDF para obtener la función generatePDF
  const { generatePDF } = useGeneratePDF();
  
  // Definir estados para gestionar los empleados, carga y errores
  const [employees, setEmployees] = useState([]); // Estado para almacenar los empleados
  const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga
  const [error, setError] = useState(null); // Estado para almacenar cualquier error

  // useEffect se ejecuta al cargar el componente, para traer los empleados de la API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees"); // Solicita los datos de los empleados desde la API
        if (!response.ok) {
          throw new Error("Error al cargar los empleados"); // Manejo de error si la respuesta no es exitosa
        }
        const data = await response.json(); // Convierte la respuesta a JSON
        setEmployees(data.data); // Ajusta el estado de empleados con los datos obtenidos
      } catch (error) {
        console.error("Error fetching employees:", error); // Muestra el error en consola si ocurre un problema
        setError(error.message); // Guarda el mensaje de error en el estado
      } finally {
        setLoading(false); // Cambia el estado de carga a false una vez se haya completado la solicitud
      }
    };

    fetchEmployees(); // Llama a la función para obtener los empleados
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <>
      <GlobalStyle /> {/* Establece los estilos globales */}
      <NavBar /> {/* Muestra la barra de navegación */}
      
      <div style={{ marginTop: "30px" }}>
        {/* Contenedor con dos tablas: una para reportes de actividades y otra para reportes de inventario */}
        <StyledContainer style={{ display: "flex", justifyContent: "space-between", width: "90%", justifySelf: "center", height: "50%" }}>
          {/* Primera tabla para mostrar reportes de actividades */}
          <div style={{ flex: .8, marginRight: "50px", width: "90%" }}>
            <Table
              nameOfTable={"Reportes De Actividades"}
              apiURL={"reports"} // URL para obtener los datos de los reportes
              reportApi={"reports"} // API específica para los reportes
              showAddButton={true} // Habilita el botón para agregar nuevos reportes
              showGenerateReport={true} // Habilita la opción para generar nuevos reportes
              apiReports={"activities"} // API para los datos de actividades
              nameOfReports={"Actividades"} // Nombre del reporte
            >
              <th>Nombre del archivo</th> {/* Encabezado de la columna "Nombre del archivo" */}
              <th>Fecha de creacion</th> {/* Encabezado de la columna "Fecha de creación" */}
              <th>Creado por</th> {/* Encabezado de la columna "Creado por" */}
              <th>Descargar</th> {/* Encabezado de la columna "Descargar" */}
            </Table>
          </div>

          {/* Segunda tabla para mostrar reportes de inventario */}
          <div style={{ flex: .8, width: "90%" }}>
            <Table
              nameOfTable={"Reportes De Inventario"}
              apiURL={"inventoryReport"} // URL para obtener los datos de los reportes de inventario
              showAddButton={true} // Habilita el botón para agregar nuevos reportes
              reportApi={"inventoryReport"} // API específica para los reportes de inventario
              showGenerateReport={true} // Habilita la opción para generar nuevos reportes
              apiReports={"equipments"} // API para los datos de equipos (inventario)
              nameOfReports={"Equipos"} // Nombre del reporte de equipos
            >
              <th>Nombre del archivo</th> {/* Encabezado de la columna "Nombre del archivo" */}
              <th>Fecha de creacion</th> {/* Encabezado de la columna "Fecha de creación" */}
              <th>Creado por</th> {/* Encabezado de la columna "Creado por" */}
              <th>Descargar</th> {/* Encabezado de la columna "Descargar" */}
            </Table>
          </div>
        </StyledContainer>
      </div>
    </>
  );
}
