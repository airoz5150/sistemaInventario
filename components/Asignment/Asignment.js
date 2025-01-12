import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledSearchBox from "../Search/Search"; 
import ButtonGroupExample from "../Button/Button";
import Swal from "sweetalert2";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Define el contenedor principal del modal, centrado en la pantalla
const ModalContainer = styled.div`
  text-align: center;
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  width: 450px;
  max-height: 80%;
  overflow-y: auto;
`;

// Define el estilo para el encabezado del modal
const ModalHeader = styled.h2`
  margin-bottom: 20px;
`;

// Define el estilo para el encabezado del modal
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

// Define el estilo de los botones
const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }
`;

// Define la tabla de usuarios que se mostrará en el modal
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

// Componente principal del modal para asignación de usuarios
const UserAssignmentModal = ({
  onClose, // Función para cerrar el modal
  onAssign, // Función para asignar los usuarios seleccionados
  asigmentApi, // API para obtener los usuarios a asignar
  fila1Label = "Fila 1",  // Etiqueta para la primera columna (por defecto "Fila 1")
  fila2Label = "Fila 2"  // Etiqueta para la segunda columna (por defecto "Fila 2")  
}) => {
   // Definimos los estados para los usuarios, usuarios seleccionados y término de búsqueda
  const [users, setUsers] = useState([]);  // Estado para almacenar los usuarios
  const [selectedUsers, setSelectedUsers] = useState([]);  // Estado para almacenar los usuarios seleccionados
  const [searchTerm, setSearchTerm] = useState("");  // Estado para el término de búsqueda

   // useEffect para cargar los usuarios desde la API cuando se monta el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
         // Realiza una solicitud a la API para obtener los usuarios
        const response = await fetch(`/api/${asigmentApi}`);
        const result = await response.json();
        console.log(result);

         // Si la respuesta tiene datos, actualiza el estado de los usuarios
        if (result.data) {
          setUsers(result.data);
          console.log(users); // Para depuración
        } else {
          console.error("Error:No se encontraron resultados");
        }
      } catch (error) {
        console.error("Error fetching users:", error);  // Captura cualquier error en la solicitud
      }
    };

    fetchUsers();  // Llama a la función para cargar los usuarios
  }, [asigmentApi]);  // Se ejecuta cada vez que 'asigmentApi' cambie

    // Función para alternar la selección de un usuario
  const toggleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)   // Si el usuario ya está seleccionado, lo elimina
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]

        // Si no está seleccionado, lo agrega
    );
  };

 // Filtra los usuarios basados en el término de búsqueda
  const filteredUsers = users.filter(
    (user) =>

      // Verifica si alguna de las columnas 'fila1Label' o 'fila2Label' contiene el término de búsqueda
      (user[fila1Label] && user[fila1Label].toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user[fila2Label] && user[fila2Label].toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Actualizar el equipo asignado a un usuario
  const handleEquipmentChange = (userId, equipment) => {
    setUserEquipments((prev) => ({
      ...prev,
      [userId]: equipment
    }));
  };

    // Función para manejar la asignación de los usuarios seleccionados
  const handleAssign = () => {
    if (selectedUsers.length > 0) {
      onAssign(selectedUsers);
      onClose();
    } else {
     // Si no se han seleccionado usuarios, muestra un mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se han seleccionado elementos.",
      });
    }
  };

  // El modal se devuelve junto con el contenido
  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <ModalHeader>Asignación</ModalHeader>
        <StyledSearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Table>
          <thead>
            <tr>
              <th>Select</th>
              <th>{fila1Label}</th>  {/* Muestra la información dinámica de la primera fila */}
              <th>{fila2Label}</th>   {/* Muestra la información dinámica de la segunda fila */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleUserSelection(user._id)}
                    />
                  </td>
                  <td>{user[fila1Label]}</td> 
                  <td>{user[fila2Label]}</td> 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No se encontraron resultados.</td> {/* Mensaje cuando no hay usuarios filtrados */}
              </tr>
            )}
          </tbody>
        </Table>
        <ButtonContainer>
          <ButtonGroupExample onClick={handleAssign}>Assign</ButtonGroupExample>
          <ButtonGroupExample onClick={onClose}>Cancel</ButtonGroupExample>
        </ButtonContainer>
      </ModalContainer>
    </>
  );
};

export default UserAssignmentModal;
