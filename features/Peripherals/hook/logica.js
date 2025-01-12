import { useState, useEffect } from 'react';

// Hook para manejar las peticiones a la API
const useApiData = (apiURL) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${apiURL}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const result = await response.json();
      setData(result);  // Guardamos los datos de la API en el estado
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener datos al cargar el componente
  useEffect(() => {
    fetchData();
  }, [apiURL]);

  return { data, loading, error, fetchData };
};

export default useApiData;
