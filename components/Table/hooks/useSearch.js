// Importa useState desde React para manejar el estado del componente
import { useState } from 'react';

// Declara el hook personalizado useSearch
const useSearch = () => {
    // Declara un estado 'searchTerm' para almacenar el término de búsqueda. 
  // Inicialmente, el término de búsqueda es una cadena vacía.
  const [searchTerm, setSearchTerm] = useState('');

   // Retorna un objeto que contiene el estado 'searchTerm' y la función 'setSearchTerm' 
  // para actualizar el valor de 'searchTerm' desde otros componentes o hooks.
  return {
    searchTerm,  // El valor actual del término de búsqueda
    setSearchTerm,  // Función para actualizar el término de búsqueda
  };
};

// Exporta el hook personalizado para que pueda ser utilizado en otros archivos
export default useSearch;
