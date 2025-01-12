// Importa React y el hook useState de React
import { useState } from 'react';
import React from 'react';

// Definición del hook personalizado `useModalState` para manejar el estado de los modales
const useModalState = () => {
   // Define varios estados para controlar la visibilidad de los modales y la información seleccionada
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false); // Estado para controlar la apertura del modal de asignación
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal de creación
  const [showEditCard, setShowEditCard] = useState(false);  // Estado para controlar la visibilidad del modal de edición
  const [selectedData, setSelectedData] = useState(null);  // Estado para almacenar los datos seleccionados para la edición
  const [open, setOpen] = React.useState(false); // Estado para controlar la visibilidad de un drawer (cajón lateral)

   // Función para abrir el modal de asignación
  const openAssignModal = () => setIsAssignModalOpen(true);
   // Función para cerrar el modal de asignación y mostrar el valor actual del estado en consola
  const closeAssignModal = () => {setIsAssignModalOpen(false), // Cierra el modal de asignación
     console.log(isAssignModalOpen)};  // Muestra en consola el valor actual del estado `isAssignModalOpen`

      // Función para abrir el modal de creación
  const openCreateModal = () => setShowModal(true);
    // Función para cerrar el modal de creación
  const closeCreateModal = () => setShowModal(false);

  // Función para abrir el modal de edición y almacenar los datos seleccionados
  const openEditCard = (data) => {
    setSelectedData(data);  // Establece los datos seleccionados para la edición
    setShowEditCard(true);  // Muestra el modal de edición
  };

    // Función para cerrar el modal de edición y resetear los datos seleccionados
  const closeEditCard = () => {
    setShowEditCard(false);   // Cierra el modal de edición
    setSelectedData(null);  // Resetea los datos seleccionados
  };

    // Función para abrir el drawer (cajón lateral)
  const toggleDrawer = () => () => {
    setOpen(true);  // Establece el estado de `open` a `true` para abrir el cajón lateral
  }; 
  
  
 // Retorna todos los valores y funciones necesarias para controlar los modales y el drawer
  return {
    isAssignModalOpen, // Estado de apertura del modal de asignación
    showModal,  // Estado de visibilidad del modal de creación
    showEditCard,  // Estado de visibilidad del modal de edición
    selectedData,   // Datos seleccionados para la edición
    open,  // Estado de visibilidad del drawer (cajón lateral)
    setShowModal,  // Función para establecer la visibilidad del modal de creación
    toggleDrawer, // Función para abrir el cajón lateral
    openAssignModal,  // Función para abrir el modal de asignación
    closeAssignModal,  // Función para cerrar el modal de asignación
    openCreateModal,  // Función para abrir el modal de creación
    closeCreateModal,  // Función para cerrar el modal de creación
    openEditCard,  // Función para abrir el modal de edición y establecer los datos
    closeEditCard,  // Función para cerrar el modal de edición y resetear los datos
    setShowEditCard  // Función para establecer la visibilidad del modal de edición
  };
};

// Exporta el hook `useModalState` para su uso en otros componentes
export default useModalState;
