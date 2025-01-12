import styled from "styled-components";
import ButtonGroupExample from "../Button/Button";
import CreateEmployee from "../CreateCard";
import Menu from "../Actionmenu/menu";
import EditCard from "../EditCard";
import SearchBox from "../Search/Search";
import UserAssignmentModal from "../Asignment/Asignment";
import useData from './hooks/useData';  // Hook de datos
import useModalState from './hooks/useModalState';  // Hook de modales
import useSearch from './hooks/useSearch';  // Hook de búsqueda
import useReport from './hooks/useReport';  // Hook de reportes
import useColumnNames from './hooks/useColumNames';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import useGenerateReport from './hooks/useGenerateReport';// Estilos para la tabla
import { Paper } from '@mui/material';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import useDeleteItem from "./hooks/useDeleteItem";
import DrawerData from "../DrawerData/DrawerData";
import { format } from 'date-fns';


// Componente estilizado para la tabla
const StyledTable = styled.div`
  position:relative;
  left: 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: black;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-top: 2%;

  .table-container {
  
    width: 100%;
  }

   .table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    max-whidth:1200px;
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
  }

  .table th,
  .table td {
    border: none;
    padding: 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.2s;

  }

  .table th {
    background-color: #2e4ead;
    color: white;
    font-weight: bold;
  }
    .table tr {
    background-color: #f9f9f9;
    border-bottom: 1px outset;
  }

  .table tr:hover{

  }
  

  .table tr:hover {
    background-color: #e1f5fe;
  }

  .loading {
    text-align: center;
    font-size: 18px;
    color: #555;
  }
  
  @media (max-width: 710px) {
  left:5em;
    .table {
      width: 100%;
      display: block;
      overflow-x: auto;
    }

    .table th,
    .table td {
      padding: 10px;
      font-size: 14px;
    }
  }
`;

// Componente de tabla
const Table = ({
  apiURL,  // URL de la API que se usa para obtener datos
  children,  // Los elementos hijos que se pasan al componente (generalmente las cabeceras de la tabla)
  customFields,  // Campos personalizados para mostrar en la tabla
  asigmentApi,  // API utilizada para asignaciones
  fila1Label,  // Etiqueta para la primera fila (en el modal de asignación)
  fila2Label,  // Etiqueta para la segunda fila (en el modal de asignación)
  nameOfTable,  // Nombre de la tabla
  apiReports,  // API de reportes
  objetIdName,  // Nombre del identificador de objeto
  nameOfReports,  // Nombre de los reportes
  assignApi,  // API utilizada para asignar
}) => {
  // Estados locales para el manejo de datos y UI
  const [id_equipment, setIdEquipment] = useState(null);  // ID del equipo seleccionado para asignación
  const { searchTerm, setSearchTerm } = useSearch(); // Hook de búsqueda
  const { showModal, showEditCard, selectedData, openAssignModal, closeAssignModal, isAssignModalOpen, setShowModal, openCreateModal, closeCreateModal, openEditCard, closeEditCard, toggleDrawer, open } = useModalState();
  const { handleGenerateReport, loadingReport } = useReport(apiReports, apiURL, searchTerm);  // Hook para manejar la generación de reportes
  const { imprimerReporte } = useGenerateReport(apiURL);   // Hook para imprimir reportes
  const router = useRouter();// Hook de enrutamiento para manejar las rutas
  const { data, filteredData, loading, setData, fetchData } = useData(apiURL, searchTerm); // Hook para manejar los datos
  const columnNames = useColumnNames(data);  // Hook para obtener los nombres de las columnas
  const { eliminarItem } = useDeleteItem(apiURL, setData);  // Hook para manejar eliminación de elementos

  // Ordenar los datos filtrados en orden descendente
  const sortedFilteredData = filteredData.sort((a, b) => {
    const idA = a._id;
    const idB = b._id;
    return idB.localeCompare(idA); // Orden descendente (más reciente primero)
  });

  // Verificar las rutas específicas
  const isEquipmentsOrActivitiesRoute = router.pathname === "/Equipments" || router.pathname === "/Activities" || router.pathname === "/Employees" || router.pathname === "/users" || router.pathname === "/Peripherals";
  const isAddEmployess = router.pathname === "/Reports"; // Verifica si es la ruta de reportes

  // Configuración de paginación
  const itemsPerPage = 10;  // Mostrar 10 elementos por página
  const [currentPage, setCurrentPage] = React.useState(1);  // Estado de la página actual

  // Calcula el total de páginas
  const totalPages = Math.ceil(sortedFilteredData.length / itemsPerPage);

  // Obtener los datos de la página actual
  const currentData = sortedFilteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Manejar el cambio de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Función para confirmar la eliminación de un elemento
  const confirmarEliminacion = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });

    if (result.isConfirmed) {
      eliminarItem(id); // Llama a eliminarItem si se confirma
    }
  };

  // Función para guardar los datos actualizados de un empleado
  const handleSave = (updatedEmployee) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === updatedEmployee._id ? updatedEmployee : item
      )
    );
    closeEditCard(); // Cierra el modal de edición
    fetchData();//recarga de componente table
  };

  // Función para manejar la asignación de usuarios
  const handleAssignClick = (item) => {
    if (item._id) {
      setIdEquipment(item._id);
      openAssignModal();
    } else {
      console.error("ID del equipo no está disponible:", item);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo encontrar el ID del equipo.",
      });
    }
  };

  // Función para realizar la asignación de usuarios a un equipo
  const handleAssign = async (selectedUsers) => {
    if (!selectedUsers || selectedUsers.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se han seleccionado usuarios.",
      });
      return;

    }

    // Asume que `id_equipment` y `apiURL` están definidos en algún lugar de tu código.
    const assignedInfo = {
      id_user: selectedUsers.join(','),  // Combina los IDs seleccionados en una cadena
      id: id_equipment,
      id_equipment: id_equipment,
    };

    const assignedInfoActivity = {
      id_user: selectedUsers.join(','),  // Combina los IDs seleccionados en una cadena
      id: id_equipment,
      activities: [id_equipment],  // Cambié esto a un array de actividades.
    };
    const assignedInfoPeripherals = {
      id_user: selectedUsers.join(','),  // Combina los IDs seleccionados en una cadena
      id: id_equipment,
      [objetIdName]: id_equipment,
    };

    // Función para manejar la respuesta de la API
    const handleResponse = async (url, body, changeStatus = false) => {
      try {
        console.log(id_equipment);

        const response = await fetch(`/api/${apiURL}?id=${id_equipment}`);
        if (!response.ok) {
          throw new Error("Error al obtener el estado de la actividad.");
        }

        const result = await response.json();
        console.log("este es el estatus de la actividad" + result.data.status);

        // Verificar si el estado es "asignada", "En proceso" o "finalizada"
        if (["Asignada", "En proceso", "finalizada"].includes(result.data.status)) {
          Swal.fire({
            icon: 'info',
            title: 'No se puede Asignar',
            text: 'La actividad ya se encuentra asignada',
            confirmButtonText: 'Aceptar',
          });
          console.log("La actividad ya se encuentra asignada, finalizada o en proceso.");
          return; // No continuar si ya tiene un estado no deseado
        }

        // Si el estado es "Sin asignar", cambiarlo a "Asignada"
        if (result.data.status === "Sin asignar" && changeStatus) {
          console.log("aqui deberia entrar para cambiar el status");
          const updateStatusResponse = await fetch(`/api/${apiURL}?id=${id_equipment}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Asignada" }),
          });

          if (!updateStatusResponse.ok) {
            throw new Error("Error al actualizar el estado de la actividad.");
          }

          console.log("Estado actualizado a 'Asignada'");
        }

        // Si no tiene uno de esos estados, proceder con la actualización
        const updateResponse = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!updateResponse.ok) {
          throw new Error("Error al actualizar la asignación.");
        }

        const updateResult = await updateResponse.json();
        console.log("Asignación exitosa:", updateResult);

        Swal.fire({
          title: "Asignación exitosa!",
          text: `${selectedUsers.length} asignado(s) correctamente.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        closeAssignModal();

        // Esperar 5 segundos después de cerrar el modal antes de ejecutar fetchData
        setTimeout(async () => {
          await fetchData(); // Ejecutar `fetchData()` después de 5 segundos
        }, 2000);


      } catch (error) {
        console.error("Error en handleResponse:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudo realizar la asignación.",
        });
      }
    };

    // Función para asignar o agregar actividades
    const assignActivities = async () => {
      try {
        const res = await fetch(`/api/${assignApi}?id=${selectedUsers}`);
        const result = await res.json();

        if (Array.isArray(result.data.activities) && result.data.activities.length > 0) {
          // Verificar si el id_equipment ya está en el array de activities
          if (!result.data.activities.includes(id_equipment)) {
            result.data.activities.push(id_equipment);
            const sendData = { activities: result.data.activities };
            await handleResponse(`/api/${assignApi}?id=${selectedUsers}`, sendData, true);
            try {
              const updateAcitivitiesAssing = await fetch(`/api/activities?id=${id_equipment}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: selectedUsers }),
              });
              const resultAssing = await updateAcitivitiesAssing.json()
              console.log("Asignacion de usuario a la actividad exitosa", resultAssing);
            } catch (error) {
              console.log("error al asignar usuario a la actividad", error);
            }
          } else {
            console.log("El equipo ya está asignado a esta actividad.");
          }
        } else {
          // Si no hay actividades, asignar la actividad inicial
          await handleResponse(`/api/${assignApi}?id=${selectedUsers}`, assignedInfoActivity, true); // Pasamos true para actualizar el estado
          try {
            const updateAcitivitiesAssing = await fetch(`/api/activities?id=${id_equipment}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user: selectedUsers }),
            });
            const resultAssing = await updateAcitivitiesAssing.json()
            console.log("Asignacion de usuario a la actividad exitosa", resultAssing);
          } catch (error) {
            console.log("error al asignar usuario a la actividad", error);
          }
        }
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener las actividades.",
        });
      }
    };

    // Llamar a la función para asignar actividades
    if (assignApi === "employees") {
      await handleResponse(`/api/${assignApi}?id=${selectedUsers}`, assignedInfo, true); // Pasamos true para actualizar el estado
    } else if (assignApi === "equipments") {
      await handleResponse(`/api/${assignApi}?id=${selectedUsers}`, assignedInfoPeripherals, true); // Pasamos true para actualizar el estado
    } else {
      await assignActivities();
    }

  };


  useEffect(() => {
    console.log("useEffect ejecutado");

    if (loading || loadingReport) {
      // Muestra un SweetAlert con el mensaje de carga
      console.log("Cargando...");

      if (loadingReport) {
        setTimeout(async () => {
          await fetchData(); // Ejecutar `fetchData()` después de 2 segundos
        }, 2000);
      } else {
        Swal.fire({
          title: 'Cargando...',
          text: 'Por favor espera, estamos procesando la solicitud.',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
      }
    } else {
      // Si loading es false, cerramos el SweetAlert
      Swal.close();
    }

  }, [loading, loadingReport, data]);  // Aquí cambiamos la dependencia para que se ejecute cada vez que `loading` o `loadingReport` cambien.

  const handleCreateEmployee = (newEmployee) => {
    setData((prevData) => [...prevData, newEmployee]);
    closeCreateModal();
    fetchData()
  };
  const drawerRef = React.useRef(null); // Usamos una referencia para controlar el Drawer desde el padre
  const [currentItemId, setCurrentItemId] = useState(null); // Estado para almacenar el ID del item actual

  const openDrawer = (itemId) => {
    setCurrentItemId(itemId);
    console.log(currentItemId); // Actualizamos el ID del equipo cuando se hace clic
    if (drawerRef.current) {
      drawerRef.current.toggleDrawer(true)(); // Llamamos a la función toggleDrawer del hijo
    }
  };


  return (
    <StyledTable>
      <h2>{nameOfTable}</h2>
      {!router.pathname.includes("/Reports") && (
        <ButtonGroupExample sx={{ borderRadius:"35px",boxShadow:"5px 5px 10px rgba(0, 0, 0, 0.5)"}} variant="contained" onClick={openCreateModal}>
          <strong>Agregar +</strong>
        </ButtonGroupExample>
      )}
      {!isEquipmentsOrActivitiesRoute && (
        <ButtonGroupExample  sx={{ borderRadius:"35px",boxShadow:"5px 5px 10px rgba(0, 0, 0, 0.5)"}} variant="contained" onClick={handleGenerateReport} >
          Generar Reporte
        </ButtonGroupExample>
      )}


      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {showModal && (
        <CreateEmployee
          directionApi={apiURL}
          title="Crear"
          customFields={customFields}
          onClose={closeCreateModal}
          onSave={handleCreateEmployee}
        />
      )}

      {showEditCard && selectedData && (
        <EditCard
          customFields={customFields}
          apiDirection={apiURL}
          title="Editar"
          fields={selectedData}
          data={selectedData}
          onClose={closeEditCard}
          onSave={handleSave}
        />
      )}

      {isAssignModalOpen && (
        <UserAssignmentModal
          onClose={closeAssignModal}
          onAssign={handleAssign}
          asigmentApi={asigmentApi}
          fila1Label={fila1Label}
          fila2Label={fila2Label}
        />
      )}
      <DrawerData ref={drawerRef} itemId={currentItemId} /> {/* Pasamos la referencia al componente hijo */}

      {loading ? (
        <div className="loading">Cargando datos...</div>
      ) : (
        <div className="table-container">
          <Paper>
            <table className="table">
              <thead>
                <tr>{children}</tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item._id}>
                      {columnNames.map((columnName) => {
                        // Verificar si la columna es una fecha (ajusta la clave según tu estructura)
                        if (columnName === 'createdAt' && item[columnName]) {
                          // Formatear la fecha en el formato 'dd/MM/yyyy'
                          return (
                            <td key={columnName}>
                              {format(new Date(item[columnName]), 'dd/MM/yyyy')}
                            </td>
                          );
                        }

                        // Si no es una fecha, mostrar el valor como está
                        return <td key={columnName}>{item[columnName]}</td>;
                      })}
                      <td className="actionButtons">
                        <Menu
                          id={item._id}
                          onDelete={() => confirmarEliminacion(item._id)}
                          onEdit={() => openEditCard(item)}
                          onShow={() => {
                            openAssignModal();
                            handleAssignClick(item);
                          }}
                          onDowload={() => imprimerReporte(item._id)}
                          onShowDrawer={() => openDrawer(item._id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columnNames.length + 1} className="noResults">
                      No se encontraron resultados.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
            <Pagination style={{ margin: "20px", placeSelf: "center", padding: "0 0 10px 0" }}
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />

          </Paper>
        </div>
      )}
    </StyledTable>
  );
};

export default Table;