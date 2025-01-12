// hooks/useAssignModal.js
import { useState } from "react"; // Importa el hook useState de React para manejar el estado dentro del componente

// Definición del hook personalizado useAssignModal
function useAssignModal  ()  {
   // Estado que controla si el modal de asignación está abierto o cerrado. Inicialmente está cerrado (false).
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  // Estado que almacena el id del equipo seleccionado para asignar. Inicialmente es null (sin valor).
  const [id_equipment, setIdEquipment] = useState(null);

   // Función que abre el modal de asignación y establece el id del equipo seleccionado.
  const openAssignModal = (id) => {
    setIdEquipment(id);  // Establece el id del equipo seleccionado en el estado id_equipment
    setIsAssignModalOpen(true);  // Cambia el estado para abrir el modal
  };

   // Función que cierra el modal de asignación.
  const closeAssignModal = () => setIsAssignModalOpen(false); // Cambia el estado para cerrar el modal

  // Devuelve los estados y funciones que permiten controlar la apertura/cierre del modal y acceder al id del equipo.
  return { 
    isAssignModalOpen,  // Estado que indica si el modal está abierto o cerrado
    openAssignModal,  // Función para abrir el modal
    closeAssignModal,  // Función para cerrar el modal
    id_equipment };   // Estado que contiene el id del equipo seleccionado
};

export default useAssignModal;  // Exporta el hook para que pueda ser utilizado en otros componentes
