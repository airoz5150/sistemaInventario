import React from 'react';  // Importa React para poder crear componentes de React

// Importa los componentes Button y ButtonGroup desde la librería Material-UI (MUI)
// Button es para crear botones, y ButtonGroup agrupa múltiples botones
import { Button, ButtonGroup } from '@mui/material'; 


// Define y exporta el componente funcional ButtonGroupExample
export default function ButtonGroupExample({ color, fondo, children, ...prop }) {
  return (
     // Utiliza el componente ButtonGroup de MUI para agrupar los botones
    <ButtonGroup sx={{placeContent: "flex-end"}} variant="outlined" aria-label="Basic button group">
      <Button  size='large' {...prop}>{children}</Button>  {/* El botón utiliza las propiedades pasadas como props */}
    </ButtonGroup>
  );
}
