// hooks/useAssign.js
import Swal from "sweetalert2";
import { useRouter } from "next/router";

// Definición del hook useAssign que recibe el apiURL y el id_equipment como parámetros
const useAssign = (apiURL, id_equipment) => {
  const router = useRouter(); // Obtiene el router para conocer la ruta actual

    // Función principal que maneja la asignación de usuarios
  const handleAssign = async (selectedUsers) => {
    // Si no se han seleccionado usuarios, muestra una alerta de error
    if (!selectedUsers || selectedUsers.length === 0) {
      Swal.fire({
        icon: "error",  // Tipo de alerta
        title: "Error", // Título de la alerta
        text: "No se han seleccionado usuarios.",  // Mensaje de la alerta
      }); 
      return; // Sale de la función si no hay usuarios seleccionados
    }

     // Crea el objeto de información de asignación para el equipo
    const assignedInfo = {
      id_user: selectedUsers.join(","),  // Convierte los usuarios seleccionados en una cadena separada por comas
      id: id_equipment, // El id del equipo
      id_equipment: id_equipment,   // El id del equipo (redundante, pero utilizado en la asignación)
    };

      // Crea el objeto de información de actividad relacionada con los usuarios asignados
    const assignedInfoActivity = {
      id_user: selectedUsers.join(","),  // Usuarios seleccionados, también como una cadena separada por comas
      id: id_equipment,  // El id del equipo
      activities: [id_equipment],
    };

     // Función que maneja la respuesta de la API, actualiza el estado de la actividad y asigna el equipo
    const handleResponse = async (url, body, changeStatus = false) => {
      try {
        // Realiza una solicitud para obtener el estado actual de la actividad del equipo
        const response = await fetch(`/api/${apiURL}?id=${id_equipment}`);
        if (!response.ok) {
          throw new Error("Error al obtener el estado de la actividad.");  // Si la respuesta no es correcta, lanza un error
        }

        const result = await response.json(); // Convierte la respuesta en formato JSON

         // Si el estado de la actividad ya es uno de los estados finales, no hace nada
        if (["Asignada", "En proceso", "finalizada"].includes(result.data.status)) {
          return;  // Sale de la función si la actividad ya tiene uno de estos estados
        }

          // Si el estado es "Sin asignar" y se debe cambiar el estado, lo actualiza a "Asignada"
        if (result.data.status === "Sin asignar" && changeStatus) {
          const updateStatusResponse = await fetch(`/api/${apiURL}?id=${id_equipment}`, {
            method: "PUT",   // Realiza una solicitud PUT para actualizar el estado
            headers: { "Content-Type": "application/json" },  // Define el tipo de contenido
            body: JSON.stringify({ status: "Asignada" }),  // Cuerpo de la solicitud con el nuevo estado
          });

          if (!updateStatusResponse.ok) {
            throw new Error("Error al actualizar el estado de la actividad.");  // Si la respuesta no es correcta, lanza un error
          }
        }

         // Realiza una solicitud para asignar el equipo o registrar la actividad con los usuarios seleccionados
        const updateResponse = await fetch(url, {
          method: "PUT",  // Método de la solicitud PUT
          headers: { "Content-Type": "application/json" },  // Tipo de contenido de la solicitud
          body: JSON.stringify(body),
        });

        if (!updateResponse.ok) {
          throw new Error("Error al asignar.");  // Si la respuesta no es correcta, lanza un error
        }

        // Muestra una alerta de éxito si todo ha salido bien
        Swal.fire({
          title: "Asignación exitosa",
          icon: "success",
        });
      } catch (error) {
         // Si ocurre un error en cualquier parte del proceso, muestra una alerta de error
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    };

     // Si la ruta actual es "/Equipments", realiza la asignación de equipos a empleados
    if (router.pathname === "/Equipments") {
      handleResponse(`/api/employees?id=${selectedUsers}`, assignedInfo); // Llama a handleResponse con la URL para asignar a los empleados
    } else {
        // En otros casos, realiza la asignación a usuarios y actualiza el estado de la actividad
      handleResponse(`/api/Users?id=${selectedUsers}`, assignedInfoActivity, true);  // Llama a handleResponse con la URL para asignar a los usuarios
    }
  };

  return { handleAssign }; // Devuelve la función handleAssign para que pueda ser utilizada en otros componentes
};

export default useAssign;  // Exporta el hook para que pueda ser utilizado en otras partes de la aplicación
