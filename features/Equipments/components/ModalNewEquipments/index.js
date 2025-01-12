// Importación de estilos globales, barra de navegación y componente de tabla
import GlobalStyle from '../../../../components/globalStyle/GlobalStyle'; // Estilos globales
import NavBar from '../../../../components/NavBar/Navbar'; // Barra de navegación
import Table from '../../../../components/Table/Table';
// Definición y exportación del componente funcional ModalNewEquipments
export default function ModalNewEquipments() {
  // Definición de campos personalizados para la tabla de equipos
  const customFields = [
    { name: "name_of_equipment", label: "Nombre del equipo", type: "text", readOnly: false, required: true }, // Campo para el nombre del equipo
    { name: "serial_number", label: "Número de serie", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true }, // Campo para el número de serie
    { name: "model", label: "Modelo", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true }, // Campo para el modelo del equipo
    { name: "description", label: "Descripción", type: "textarea", readOnly: false, allowLettersAndNumbers: true, required: true }, // Campo para la descripción
    { name: "year", label: "Año", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true }, // Campo para el año
    { name: "floor", label: "Piso", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true }, // Campo para el piso donde se encuentra
    { name: "maintenance", label: "Mantenimiento", type: "text", readOnly: false, required: true }, // Campo para la información de mantenimiento
  ];

  return (
    <>
      <GlobalStyle/>
        <div className="navbar">
          <NavBar />
        </div>
        <div className="infoArea">
          <Table
            nameOfTable="Equipos" 
            apiURL="equipments" // URL del API para equipos
            customFields={customFields} // Configuración de campos personalizados
            asigmentApi="employees" // API para asignaciones
            fila1Label="name" // Campo de asignación fila 1: Nombre
            fila2Label="address" // Campo de asignación fila 2: Dirección
            assignApi="employees" // Asignar empleados a los equipos
          >
            {/* Columnas de la tabla */}
            <th>Nombre del equipo</th>
            <th>Número de serie</th>
            <th>Modelo</th>
            <th>Descripción</th>
            <th>Año</th>
            <th>Piso</th>
            <th>Mantenimiento</th>
            <th>Acciones</th>
          </Table>
        </div>
    </>
  );
}
