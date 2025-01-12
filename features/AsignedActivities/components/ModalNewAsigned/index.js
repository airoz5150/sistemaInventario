import React, { useEffect, useState } from "react";
import GlobalStyle from "../../../../components/globalStyle/GlobalStyle";
import NavBar from "../../../../components/NavBar/Navbar";
import CardAsigned from "../../../../components/CardAsigned";
import useGeneratePDF from "../../hook/generatePDF";
import { jwtDecode } from "jwt-decode";

export default function ModalNewAsigned() {
  const { generatePDF } = useGeneratePDF();
  const [employees, setEmployees] = useState([]); // Lista de empleados (actividades)
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);      // Estado de error
  const [id, setId] = useState(null);            // Estado para el id del usuario

  // Decodificar el token y obtener el id del usuario
  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (token) {
      const decodedToken = jwtDecode(token);
      setId(decodedToken.id);
    }
  }, []);  // Este effect solo se ejecuta una vez cuando el componente se monta

  // Fetch de las actividades de los empleados cuando el id está disponible
  useEffect(() => {
    if (id) { // Solo hacer el fetch si el id está presente
      const fetchEmployees = async () => {
        try {
          const response = await fetch(`/api/Users?id=${id}`);
          if (!response.ok) {
            throw new Error("Error al cargar las actividades");
          }
          const data = await response.json();
          console.log(data.data.activities);

          // Filtrar las actividades que no tienen el status 'Finalizada'
          const filteredEmployees = data.data.activities.filter(
            (employee) => employee.status !== "Finalizada"
          );

          setEmployees(filteredEmployees); // Establecer solo las actividades que no están finalizadas
        } catch (error) {
          console.error("Error fetching activities:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployees();
    }
  }, [id]);  // El useEffect se ejecuta cada vez que cambia el `id`

  return (
    <>
      <GlobalStyle />
        <NavBar />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",position: "relative,",left: "3em" }}>
          {loading && <div>Cargando actividades...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && !error && employees.length === 0 && (
            <div>No hay actividades disponibles.</div>
          )}
          {employees.map((employee) => (
            <CardAsigned
              key={employee._id}
              employee={employee}
              onGeneratePDF={generatePDF}
            />
          ))}
        </div>
    </>
  );
}
