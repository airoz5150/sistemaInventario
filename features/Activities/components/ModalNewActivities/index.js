import NavBar from '../../../../components/NavBar/Navbar';
import Table from '../../../../components/Table/Table';
import GlobalStyle from '../../../../components/globalStyle/GlobalStyle';

// Definición y exportación de un componente funcional llamado ModalNewActivities
export default function ModalNewActivities() {

    // Declaración de un arreglo llamado customFields que define los campos personalizados para la tabla
    const customFields = [
        { name: "_id", label: "ID", type: "text", readOnly: true, required: true }, // Campo para el ID (solo lectura)
        { name: "name_activities", label: "Nombre de actividad", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true }, // Campo para el nombre de la actividad
        { name: "description", label: "Descripcion de la actividad", type: "textarea", readOnly: false, allowLettersAndNumbers: true, required: true }, // Campo para la descripción de la actividad
        { name: "starting_date", label: "Fecha de inicio", type: "datetime-local", readOnly: false, required: true }, // Campo para la fecha de inicio de la actividad
        { name: "end_date", label: "Fecha de final", type: "datetime-local", readOnly: false, required: true }, // Campo para la fecha de fin de la actividad
    ];

    // Renderización del componente ModalNewActivities
    return (
        <>
            {/* Aplicación de estilos globales al componente */}
            <GlobalStyle/>
                {/* Contenedor para la barra de navegación */}
                <div className="navbar">
                    {/* Inclusión del componente NavBar */}
                    <NavBar />
                </div>
                {/* Contenedor para el área de información */}      
                    {/* Inclusión del componente Table con parámetros específicos */}
                    <Table
                        nameOfTable="Actividades"
                        apiURL='activities' // URL del API para obtener y manipular datos relacionados con actividades
                        customFields={customFields} // Configuración de campos personalizados para la tabla
                        asigmentApi={"Users"} // API para asignaciones de usuarios
                        fila1Label={"correo"} // Etiqueta para la primera fila (correo del usuario)
                        fila2Label={"role"} // Etiqueta para la segunda fila (rol del usuario)
                        assignApi={"Users"} // API específica para asignar usuarios
                    >
                        {/* Definición de las columnas de la tabla */}
                        <th>Nombre de la actividad</th>
                        <th>Descripcion de la actividad</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de fin</th>
                        <th>Estado</th>
                        <th>Asignado a</th>
                        <th>Acciones</th>
                    </Table>
        </>
            );
}
