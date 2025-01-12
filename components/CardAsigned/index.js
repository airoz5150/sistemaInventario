import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, CardActions, Box } from "@mui/material"; // Componentes de MUI
import AssignmentIcon from '@mui/icons-material/Assignment';  // Icono de actividad

// Definición del componente CardAsigned que recibe 'employee' como propiedad
const CardAsigned = ({ employee }) => {
    // Estado que mantiene el estado de la actividad (Asignada, En proceso, Finalizada)
  const [status, setStatus] = useState(employee.status);
  // Estado que controla la visibilidad de la tarjeta
  const [isVisible, setIsVisible] = useState(true); 
   // Función para formatear las fechas a un formato legible (YYYY-MM-DD HH:mm)
   const formatDate = (dateString) => {
    const date = new Date(dateString); // Convierte la cadena de fecha a un objeto Date
    const year = date.getFullYear(); // Obtiene el año de la fecha
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Día con dos dígitos
    const hours = date.getHours().toString().padStart(2, '0'); // Hora con dos dígitos
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos

    return `${year}-${month}-${day} ${hours}:${minutes}`; // Devuelve la fecha en el formato "YYYY-MM-DD HH:mm"
  };

  // Esta función se ejecuta cuando se hace clic en el botón de la tarjeta
  const handleButtonClick = async () => {
    let newStatus;
     // Dependiendo del estado actual, cambia el estado de la actividad
    if (status === "Asignada") {
      newStatus = "En proceso"; // Si está "Asignada", lo cambia a "En proceso"
    } else if (status === "En proceso") {
      newStatus = "Finalizada";   // Si está "En proceso", lo cambia a "Finalizada"
    } else {
      return;  // Si el estado ya es "Finalizada", no hace nada
    }

    try {
     // Realiza una petición PUT al servidor para actualizar el estado de la actividad
      const response = await fetch(`/api/activities?id=${employee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado de la actividad.");
      }

      // Si la actualización fue exitosa, actualiza el estado en el estado local
      setStatus(newStatus);
      console.log(`Estado actualizado a '${newStatus}'`);
      
      // Si el estado es "Finalizada", ocultamos la tarjeta y recargamos la página
      if (newStatus === "Finalizada") {
        setIsVisible(false); // Oculta la tarjeta
        window.location.reload(); // Recarga la página
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);  // Maneja cualquier error que ocurra durante la actualización
    }
  };

  // No renderizamos la tarjeta si el estado es "Finalizada"
  if (!isVisible) return null;

  // Función para obtener el color del botón según el estado de la actividad
  const getButtonColor = () => {
    switch (status) {
      case "Asignada":
        return "success"; // Color azul para "Asignada"
      case "En proceso":
        return "warning"; // Color amarillo para "En proceso"
      case "Finalizada":
        return "success"; // Color verde para "Finalizada"
      default:
        return "success"; // Azul por defecto
    }
  };

  // Card que muestra los detalles de la actividad
  return (
    <Card sx={{ maxWidth: 345, margin: 8, borderRadius: 4, marginTop: 8, boxShadow: 3, transition: "transform 0.2s", '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
      <CardContent sx={{ textAlign: 'center' }}>
        {/* Icono de actividad en la parte superior */}
        <Box sx={{ mb: 2 }}>
          <AssignmentIcon sx={{ fontSize: 50, color: 'primary.main' }} />
        </Box>

        {/* Nombre de la actividad */}
        <Typography variant="h5" component="div">
          {employee.name_activities}
        </Typography>

        {/* Información adicional debajo del nombre */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        <strong>Fecha de inicio:</strong> {formatDate(employee.starting_date)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        <strong>Fecha final:</strong> {formatDate(employee.end_date)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>Descripción:</strong> {employee.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>Estatus:</strong> {status} {/* Mostrar el estado actualizado */}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button  variant="contained" size="small" color={getButtonColor()}  onClick={handleButtonClick}>
         {/* El texto del botón cambia según el estado de la actividad */}
        {status === "Asignada" ? "Iniciar actividad" : status === "En proceso" ? "Finalizar" : "Actividad finalizada"}
        </Button>
      </CardActions>
    </Card>
  );
};

// Exporta el componente CardAsigned para que pueda ser utilizado en otros archivos
export default CardAsigned;
