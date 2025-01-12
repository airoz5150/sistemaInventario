import GlobalStyle from '../../../../components/globalStyle/GlobalStyle'; // Importa los estilos globales
import NavBar from '../../../../components/NavBar/Navbar'; // Importa el componente de barra de navegación
import Table from '../../../../components/Table/Table'; // Importa el componente de tabla para mostrar los datos

export default function ModalNewUser() {
  // Definir los campos personalizados para el formulario de creación de usuario
  const customFields = [
    { name: "correo", label: "Correo", type: "email", readOnly: false, required: true }, // Campo para el correo, obligatorio
    { name: "password", label: "Contraseña", type: "password", readOnly: false, required: true }, // Campo para la contraseña, obligatorio
    { name: "nombreCompleto", label: "Nombre completo", type: "text", readOnly: false, required: true }, // Campo para el nombre completo, obligatorio
    {
      type: "select", // Campo select para elegir el rol del usuario
      name: "role", 
      label: "Rol", 
      required: true, // Campo obligatorio
      options: [ // Opciones disponibles para el campo de rol
        { value: "", label: "Seleccionar rol" }, // Opción vacía como placeholder
        { value: "admin", label: "admin" }, // Opción para rol de administrador
        { value: "user", label: "user" }, // Opción para rol de usuario
      ]
    }
  ];

  return (
    <>
      <GlobalStyle/> {/* Establece los estilos globales para la página */}
        <div className="navbar"> {/* Contenedor para la barra de navegación */}
          <NavBar /> {/* Muestra el componente de barra de navegación */}
        </div>
        <div className="infoArea"> {/* Contenedor principal para la información */}
          <Table 
          apiURL='Users' 
          customFields={customFields}
          nameOfTable={"Usuarios"} 
          > {/* Tabla para mostrar los usuarios con campos personalizados */}
            <th>Correo</th> {/* Encabezado de columna para el correo */}
            <th>Contraseña</th> {/* Encabezado de columna para la contraseña */}
            <th>Rol</th> {/* Encabezado de columna para el rol */}
            <th>Nombre Completo</th> {/* Encabezado de columna para el nombre completo */}
            <th>Acciones</th> {/* Encabezado de columna para acciones (editar/eliminar) */}
          </Table>
        </div>
     
    </>
  );
}
