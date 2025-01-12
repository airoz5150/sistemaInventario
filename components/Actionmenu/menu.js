import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

// Importa los íconos de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faDownload, faClipboardList } from '@fortawesome/free-solid-svg-icons';

// Define el contenedor estilizado para el menú
const MenuContainer = styled.div`
  .dropButton {
    position: relative;
    display: inline-block;
    border: 2px solid #ddd;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .dropButton:hover {
    background: #ddd;
  }

  .dropdown {
    display: block;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.9); /* Fondo semi-transparente */
    border: 2px solid #ddd;
    border-radius: 8px;
    z-index: 2;
    margin-left:10px;
    padding: 10px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2); /* Sombra más fuerte */
  }

  .menu-item {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }
  }

  .menu-item svg {
    margin-right: 8px; /* Espacio entre el ícono y el texto */
  }
@media (max-width: 710px) {  
    .dropdown {
      display: block;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.9); /* Fondo semi-transparente */
    border: 2px solid #ddd;
    border-radius: 8px;
    z-index: 2;
    margin-left:10px;
    right:0.05em;
    padding: 10px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2); /* Sombra más fuerte */
    }  
  }

`;

// Define un botón de descarga estilizado
const DownloadButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

// Componente principal del menú
const Menu = ({ id, onDelete, onEdit, onShow, onDowload,onShowDrawer }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado
  const menuRef = useRef(null);  // Referencia para el menú desplegable
  const buttonRef = useRef(null);  // Referencia para el botón de activación del menú
  const router = useRouter();  // Usamos el hook useRouter para obtener la ruta actual de la aplicación

   // Estado para posicionar dinámicamente el menú
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Cambia el estado de 'isOpen' entre true o false
  };

 // Función para cerrar el menú cuando se hace clic fuera de él
 const handleClickOutside = (event) => {
  // Si el clic no es dentro del menú ni del botón, cierra el menú
  if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
    setIsOpen(false); // Cierra el menú
  }
};

const handleWheel = (event) => {
  // Si el desplazamiento de la rueda no es dentro del menú ni del botón, cierra el menú
  if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
    setIsOpen(false); // Cierra el menú
  }
};

// Usamos useEffect para escuchar los eventos de clic y rueda del ratón
useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside); // Evento para clic fuera
  document.addEventListener("wheel", handleWheel); // Evento para rueda del ratón

  // Limpiar los eventos al desmontar el componente
  return () => {
    document.removeEventListener("mousedown", handleClickOutside); // Elimina el evento de clic
    document.removeEventListener("wheel", handleWheel); // Elimina el evento de rueda
  };
}, []); // Solo se ejecuta una vez al montar el componente
// Solo se ejecuta una vez al montar el componente

   // Usamos useEffect para ajustar la posición del menú cada vez que se abre
   // Se ejecuta cada vez que 'isOpen' cambia

  // Determina si la ruta actual es una de las rutas específicas
  const isEquipmentsOrActivitiesRoute = router.pathname === "/Equipments" || router.pathname === "/Activities"||
  router.pathname === "/Peripherals";
  const isReportRoute = router.pathname === "/Reports";  // Si estamos en la ruta de reportes

  const isEquipments = router.pathname === "/Equipments"; // Si estamos en la ruta de Equipments

   // Si estamos en la ruta de reportes, renderiza solo el botón de descarga
  if (isReportRoute) {
    return (
      <DownloadButton onClick={onDowload} title="Descargar reporte">
        <FontAwesomeIcon icon={faDownload} />
      </DownloadButton>
    );
  }

    // Renderiza el menú con sus opciones
  return (
    <MenuContainer ref={menuRef}>
      <div onClick={toggleMenu} ref={buttonRef} className="dropButton">
        <span><strong>☰</strong></span>
      </div>
      <div 
        className="dropdown" 
        style={{ 
          display: isOpen ? "block" : "none", 
        }}
      >
        <div className="menu-item" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </div>
        <div className="menu-item" onClick={onEdit}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </div>
         {/* Si estamos en las rutas de Equipments, Activities o Peripherals, muestra la opción "Asignación" */}
        {isEquipmentsOrActivitiesRoute && (
          <div className="menu-item" onClick={onShow}>
            <FontAwesomeIcon icon={faClipboardList} /> Asignment
          </div>
        )}
         {/* Si estamos en la ruta de Equipments, muestra la opción "Detalles" */}
        {isEquipments && (
          <div className="menu-item" onClick={onShowDrawer}>
          <FontAwesomeIcon icon={faClipboardList} /> Detalles
        </div>
        )}
      </div>
    </MenuContainer>
  );
};

export default Menu;
