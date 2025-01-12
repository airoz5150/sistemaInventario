// Importa la librería SweetAlert2 para mostrar mensajes de alerta (pop-ups)
import Swal from "sweetalert2";

// Define un hook personalizado `useDeleteItem` que maneja la eliminación de un elemento en la API
function useDeleteItem (apiURL, setData) {
  // Define la función `eliminarItem`, que recibe el `id` del elemento a eliminar
  const eliminarItem = async (id) => {
    try {
      console.log("entra useDelete Item"); // Mensaje de depuración que indica que la función se ha ejecutado
       // Realiza una solicitud `DELETE` a la API usando el `id` del elemento
      const response = await fetch(`/api/${apiURL}?id=${id}`, { method: "DELETE" });

       // Si la respuesta de la API es exitosa (código 200)
      if (response.ok) {
          // Muestra una alerta de éxito con SweetAlert2
        Swal.fire({
          title: "Eliminado!", // Título del mensaje
          text: "El elemento ha sido eliminado correctamente.", // Texto del mensaje
          icon: "success", // Icono de éxito
        });
 // Actualiza el estado `data` eliminando el elemento de la lista que tiene el `id` coincidente
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
         // Si la respuesta no es exitosa, obtiene el mensaje de error del resultado
        const result = await response.json();
         // Muestra una alerta de error con SweetAlert2, mostrando el mensaje de error de la API
        Swal.fire({
          icon: "error",  // Icono de error
          title: "Error",  // Título del mensaje
          text: `Error al eliminar el elemento: ${result.message}`, // Texto con el mensaje de error obtenido de la respuesta
        });
      }
    } catch (error) {
       // Si ocurre un error durante la solicitud (por ejemplo, no hay conexión)
      console.error("Error:", error);  // Muestra el error en la consola
        // Muestra una alerta de error con SweetAlert2 indicando que hubo un problema al eliminar
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al intentar eliminar el elemento.", // Texto del mensaje
      });
    }
  };
 // Retorna el objeto con la función `eliminarItem` para que pueda ser utilizada en otros componentes
  return { eliminarItem };
};
// Exporta el hook `useDeleteItem` para que pueda ser utilizado en otros componentes
export default useDeleteItem;

