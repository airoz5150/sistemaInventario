// Definición del hook personalizado `useColumnNames` que recibe un array de datos y devuelve los nombres de las columnas.
const useColumnNames = (data) => {
   // Se verifica si `data` tiene al menos un elemento (data.length > 0).
  // Si es así, se extraen las claves del primer objeto de `data` y se filtran las que no se quieren incluir como nombres de columnas.
    const columnNames = data.length > 0
    // Filtra las claves que no deben ser consideradas como nombres de columnas.
      ? Object.keys(data[0]).filter(key => !['_id', 'id_equipments', 'id_area', 'activities', '__v', 'contenido', 'data','id_equipment'].includes(key))
      : []; // Si `data` está vacío, devuelve un array vacío.
  
       // Retorna el array `columnNames`, que contiene los nombres de las columnas después del filtrado.
    return columnNames;
  };
  
  // Exporta el hook `useColumnNames` para que pueda ser utilizado en otros componentes.
  export default useColumnNames;
  