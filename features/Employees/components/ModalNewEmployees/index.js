// Importación de ThemeProvider y createTheme para manejar temas en MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Importación de estilos globales, barra de navegación y tabla personalizada
import GlobalStyle from '../../../../components/globalStyle/GlobalStyle';
import NavBar from '../../../../components/NavBar/Navbar'; // Barra de navegación
import Table from '../../../../components/Table/Table'; // Componente de tabla
import Grid from '@mui/material/Grid2';
// Definición y exportación del componente funcional ModalNewEmployees
export default function ModalNewEmployees() {
  // Definición de campos personalizados para la tabla
  const customFields = [
    { name: "name", label: "Nombre", type: "text", readOnly: false, required: true }, // Campo para el nombre del empleado
    { name: "lastname", label: "Apellido", type: "text", readOnly: false, required: true }, // Campo para el apellido
    { name: "phone", label: "Teléfono", type: "number", readOnly: false, required: true }, // Campo para el teléfono
    { name: "address", label: "Dirección", type: "email", readOnly: false, required: true }, // Campo para la dirección (correo)
    { name: "position", label: "Posición", type: "text", readOnly: false, required: true }, // Campo para la posición o cargo
  ];

  return (
    <>
      <GlobalStyle />
      <div className="navbar">
        <NavBar />
      </div>
      
         <Table
          apiURL="employees"
          customFields={customFields}
          nameOfTable="Empleados">
          {/* Definición de las columnas visibles de la tabla */}
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Posición</th>
          <th>Acciones</th>
          </Table>

    </>
      );
}
