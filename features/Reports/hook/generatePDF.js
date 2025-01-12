// hooks/useGeneratePDF.js

import { useCallback } from "react"; // Importa useCallback de React para evitar redefinir la función innecesariamente.
import jsPDF from "jspdf"; // Importa la librería jsPDF para generar archivos PDF.

const useGeneratePDF = () => {
  // Utiliza useCallback para memorizar la función y evitar que se redefina en cada render.
  const generatePDF = useCallback((employee) => {
    // Crea una nueva instancia de jsPDF para generar el documento PDF.
    const pdf = new jsPDF();

    // Define el tamaño de la fuente a 12.
    pdf.setFontSize(12);

    // Añade el nombre del empleado al documento, en la posición (10, 10) del PDF.
    pdf.text(`Nombre: ${employee.name}`, 10, 10);

    // Añade el apellido del empleado, en la posición (10, 20) del PDF.
    pdf.text(`Apellido: ${employee.lastname}`, 10, 20);

    // Añade el teléfono del empleado, en la posición (10, 30) del PDF.
    pdf.text(`Teléfono: ${employee.phone}`, 10, 30);

    // Añade la dirección del empleado, en la posición (10, 40) del PDF.
    pdf.text(`Correo: ${employee.address}`, 10, 40);

    // Añade la posición del empleado, en la posición (10, 50) del PDF.
    pdf.text(`Posición: ${employee.position}`, 10, 50);

    // Guarda el archivo PDF con el nombre basado en el nombre del empleado.
    pdf.save(`${employee.name}_reporte.pdf`);
  }, []); // Dependencias vacías, lo que significa que la función se memoriza una sola vez.

  // Retorna el objeto con la función generatePDF para que otros componentes puedan utilizarla.
  return { generatePDF };
};

export default useGeneratePDF; // Exporta el hook para su uso en otros componentes.
