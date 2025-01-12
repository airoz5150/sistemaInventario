// Importación del hook useCallback de React y la librería jsPDF para generar archivos PDF
import { useCallback } from "react";
import jsPDF from "jspdf";

// Definición y exportación de un custom hook llamado useGeneratePDF
const useGeneratePDF = () => {
  // Función para generar un archivo PDF, definida con useCallback para optimizar rendimiento
  const generatePDF = useCallback((employee) => {
    // Crear una nueva instancia de jsPDF
    const pdf = new jsPDF();

    // Configurar el tamaño de fuente para el PDF
    pdf.setFontSize(12);

    // Agregar información del empleado al PDF, posicionándola en coordenadas específicas
    pdf.text(`Nombre: ${employee.name}`, 10, 10); // Nombre del empleado
    pdf.text(`Apellido: ${employee.lastname}`, 10, 20); // Apellido del empleado
    pdf.text(`Teléfono: ${employee.phone}`, 10, 30); // Teléfono del empleado
    pdf.text(`Correo: ${employee.address}`, 10, 40); // Dirección o correo del empleado
    pdf.text(`Posición: ${employee.position}`, 10, 50); // Posición o cargo del empleado

    // Guardar el archivo PDF con un nombre dinámico basado en el nombre del empleado
    pdf.save(`${employee.name}_reporte.pdf`);
  }, []); // La dependencia es un arreglo vacío ya que no se necesita actualizar el callback

  // Retornar la función para que pueda ser utilizada en otros componentes
  return { generatePDF };
};

export default useGeneratePDF; // Exportar el hook para ser utilizado en otros archivos
