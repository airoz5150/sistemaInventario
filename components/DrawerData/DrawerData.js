import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useImperativeHandle, forwardRef } from 'react';
import Typography from '@mui/material/Typography';  // Importa Typography

// Usamos `forwardRef` para poder acceder a la referencia desde el componente padre
const DrawerData = forwardRef((props, ref) => {
  const { itemId } = props; // Extraemos itemId desde props
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  // Exponer toggleDrawer para que el componente padre lo pueda ejecutar
  useImperativeHandle(ref, () => ({
    toggleDrawer: (newOpen) => () => {
      setOpen(newOpen);
    },
  }));


  
  // Mapeo de las claves originales a las nuevas claves
  const keyMapping = {
    contenidoMoviles: "Móviles",
    contenidoTelefonica: "Telefonía",
    contenidoMouse: "Ratones",
    contenidoBocinas: "Bocinas",
    contenidoReguladores: "Reguladores",
    contenidoMonitores: "Monitores",
    contenidoTeclado: "Teclados"
  };

  // Función para renombrar las claves del objeto
  const renameKeys = (obj, keyMapping) => {
    const renamedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = keyMapping[key] || key; // Si la clave está en el mapeo, la cambiamos
      renamedObj[newKey] = value;
    }
    return renamedObj;
  };

  // Función para obtener los datos desde la API
  const fetchDrawerData = async () => {
    try {
      const response = await fetch(`/api/equipments?id=${itemId}`);  // Hace la solicitud a la API con el itemId
      const result = await response.json();   // Convierte la respuesta de la API a formato JSON

      console.log(result);   // Imprime la respuesta de la API para verificar los datos

      // Si result.data contiene datos válidos y es un objeto
      if (result && result.data && typeof result.data === 'object') {
        const { contenidoMoviles, contenidoTelefonica, contenidoMouse, contenidoBocinas, contenidoReguladores, contenidoMonitores, contenidoTeclado } = result.data;
        
        // Crea un nuevo objeto con solo las propiedades relevantes
        const filteredData = {
          contenidoMoviles,
          contenidoTelefonica,
          contenidoMouse,
          contenidoBocinas,
          contenidoReguladores,
          contenidoMonitores,
          contenidoTeclado
        };
        
        const renamedData = renameKeys(filteredData, keyMapping);  // Renombra las claves de filteredData

          // Función para procesar los datos y eliminar campos innecesarios como _id y __v
        const processData = (data) => {

          return Array.isArray(data) && data.length > 0 ? data.map(({_id, __v, ...rest}) => rest) : [];
        };
  
        // Procesa los datos renombrados
        renamedData.Monitores = processData(renamedData.Monitores);
        renamedData.Reguladores = processData(renamedData.Reguladores);  
        renamedData.Ratones = processData(renamedData.Ratones);  
        renamedData.Bocinas = processData(renamedData.Bocinas);  
        renamedData.Telefonía = processData(renamedData.Telefonía);  
        renamedData.Teclados = processData(renamedData.Teclados);  
        renamedData.Móviles = processData(renamedData.Móviles);
  
        console.log(renamedData); // Imprime los datos renombrados para verificar
        setData(renamedData);  // Actualiza el estado con los datos procesados y renombrados
      } else {
        console.error("La respuesta no contiene datos válidos", result);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  

  // Usamos `useEffect` para cargar los datos cuando `itemId` cambie
  React.useEffect(() => {
    console.log("Item ID recibido:", itemId);
    if (itemId) {
      fetchDrawerData(itemId); // Cargar los datos cuando `itemId` cambia
    }
  }, [itemId]);

   // Función para crear los paneles de acordeón a partir de los datos obtenidos
  const createAccordionList = () => {
    return Object.entries(data).map(([key, value], index ) => (
      <Accordion
      key={index}
      sx={{
        '&:hover': {
          background: '#e1f5fe', // Cambia el fondo al hacer hover
        }
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon   />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
      
      >
        <strong>{key}</strong> {/* Muestra la clave renombrada como el título del acordeón */}
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {renderDetails(value)}  {/* Llama a renderDetails para mostrar el contenido del acordeón */}
        </List>
      </AccordionDetails>
    </Accordion>
    
    ));
  };

  // Función recursiva para renderizar los detalles de cada valor en los acordeones
  const renderDetails = (value) => {
    // Si el valor es un array vacío
    if (Array.isArray(value) && value.length === 0) {
      return <Box key="no-data"><strong>Sin datos para mostrar...</strong></Box>; 
    }
  
    // Si el valor es un objeto vacío o null
    if (value === null || (typeof value === 'object' && Object.keys(value).length === 0)) {
      return <Box key="no-data"><strong>Sin datos para mostrar...</strong></Box>;
    }
  
    // Si el valor es un array, lo recorremos y mostramos sus elementos
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Box key={index} sx={{ paddingLeft: 2 }}>
          {renderDetails(item)} {/* Llamada recursiva para procesar objetos dentro del array */}
        </Box>
      ));
    }
  
    // Si el valor es un objeto, mapeamos sus claves y valores
    if (typeof value === 'object' && value !== null) {
      return Object.entries(value).map(([subKey, subValue], index) => (
        <Box key={index} sx={{ placeSelf: "self-start", display: 'flex', justifyContent: 'space-between' }}>
          <strong>{subKey}:</strong><span>{String(subValue)}</span>
        </Box>
      ));
    }
  
    // Si el valor no es ni un array ni un objeto, simplemente lo mostramos como texto
    return <Box key={0}><strong></strong> {String(value || "Sin datos para mostrar...")}</Box>;
  };
  return (
    <div >
      <Button style={{display:"none"}} onClick={() => setOpen(true)}>Detalles</Button>
      <Drawer open={open} onClose={() => setOpen(false)}
       sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,  // Asegura que el Drawer esté por encima del Navbar
      }}
        >
       <Box  sx={{
            width: '50vw',  // Usa el 50% del ancho de la pantalla (viewport width)
            minWidth: 300,  // Garantiza un ancho mínimo
            maxWidth: 600,  // Establece un ancho máximo si lo deseas
            height: '100%', // Asegura que el contenido del Drawer tenga una altura completa
          }} role="presentation" >
          {/* Título del Drawer */}
          <Typography variant="h6" sx={{ padding: 2, textAlign: 'center' }}>
            Detalles
          </Typography>
          
          <List >
            {createAccordionList()}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
});

export default DrawerData;
