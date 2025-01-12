import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { People, Computer, AccountCircle, Assignment } from '@mui/icons-material'; // Iconos de Material UI
import { jwtDecode } from 'jwt-decode';

// Componente que representa una tarjeta individual
const CardComponent = ({ title, description, count, onClick, icon: Icon }) => {
  return (
    <Card
      sx={{
        backgroundColor:'#ebebea',
        width: '100%', // Asegura que la tarjeta ocupe el 100% del ancho disponible en su contenedor
        maxWidth: '400px', // Limita el ancho máximo para que las tarjetas no se estiren demasiado
        minHeight: '150px', // Asegura que la tarjeta tenga un mínimo de altura
        boxShadow: 3,
        cursor:'pointer',
        borderRadius: '16px',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-10px)', // Efecto de hover con desplazamiento más suave
          boxShadow: 8, // Sombra más pronunciada al hacer hover
        },
        marginBottom: 2, // Reduce el margen inferior para reducir el espaciado vertical
        marginRight: 0.5, // Reduce el margen derecho para ajustar el espaciado horizontal
      }}
      onClick={onClick}  // Evento que se ejecuta cuando se hace clic en la tarjeta
    >
      <CardContent 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%',
        }}
      >
        <Icon sx={{ fontSize: { xs: 40, sm: 50 }, color: '#1067d1', marginBottom: 2 }} />
        <Typography variant="h6" sx={{ color: 'black', fontWeight: '600', marginBottom: 1 }}>
          {title} {/* Título de la tarjeta */}
        </Typography>
        <Typography variant="body2" sx={{ color: '#black', lineHeight: 1.5, marginBottom: 2 }}>
          {description}  {/* Descripción breve de la tarjeta */}
        </Typography>
        <Typography variant="h5" sx={{ color: '#1067d1', fontWeight: '500' }}>
          {count} {/* Muestra el número asociado a la tarjeta (ejemplo: número de empleados, equipos) */}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Componente que contiene las tarjetas y las distribuye en una cuadrícula
const CardGrid = () => {
  const router = useRouter();  // Usamos el hook de Next.js para navegar entre las rutas
  const [role, setRole] = useState(null);   // Estado para almacenar el rol del usuario (admin o user)
  const [correo, setCorreo] = useState(null);   // Estado para almacenar el correo del usuario (no utilizado en este fragmento
  const [counts, setCounts] = useState({ employees: 0, equipment: 0, users: 0, activities: 0 });   // Estado para almacenar los conteos

  useEffect(() => {
      // Función para obtener los conteos desde la API
    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/count'); // Petición GET a la API para obtener los conteos
        const result = await response.json();  // Convierte la respuesta en JSON
        if (result.success) {
          setCounts(result.data);   // Si la respuesta es exitosa, actualiza el estado de los conteos
        } else {
          console.error('Error al obtener los conteos:', result.error);  // Muestra un error si algo falla
        }
      } catch (error) {
        console.error('Error:', error);  // Maneja cualquier error durante la petición
      }
    };

      // Obtención del token JWT desde las cookies
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');

     // Si hay un token, lo decodificamos para obtener el rol y el correo
    if (token) {
      const decodedToken = jwtDecode(token); // Decodifica el token JWT
      setRole(decodedToken.role);  // Establece el rol del usuario (admin o user)
      setCorreo(decodedToken.correo);  
    }

    fetchCounts();   // Llama a la función para obtener los conteos
  }, []);

   // Función para manejar el clic en las tarjetas, navega a la ruta correspondiente
  const handleCardClick = (path) => {
    router.push(`/${path}`);  // Redirige a la ruta proporcionada
  };

  return (
    <Box 
      sx={{ 
        padding: '40px', 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '80px',  
        position: 'relative',
        left: '2em'
      }}
    >
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        sx={{ width: '100%', maxWidth: '850px', paddingTop: '30px' }}
      >
        {/* Solo se muestra la tarjeta de "Assigned Activities" si el rol es "user" */}
        {role === 'user' && (
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CardComponent
              title="Actividades Asignadas"
              description="Realiza tus actividades"
              onClick={() => handleCardClick('AsignedActivities')}
              icon={Assignment} // Ícono para actividades asignadas
            />
          </Grid>
        )}

        {/* Solo se muestran las demás tarjetas si el rol es "admin" */}
        {role === 'admin' && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CardComponent
                title="Empleados"
                description="Gestione los empleados."
                count={counts.employees}
                onClick={() => handleCardClick('Employees')}
                icon={People}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CardComponent
                title="Equipos"
                description="Gestione los equipos"
                count={counts.equipment}
                onClick={() => handleCardClick('Equipments')}
                icon={Computer}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CardComponent
                title="Usuarios"
                description="Gestione los usuarios"
                count={counts.users}
                onClick={() => handleCardClick('users')}
                icon={AccountCircle}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CardComponent
                title="Actividades"
                description="Gestione las actividades"
                count={counts.activities}
                onClick={() => handleCardClick('Activities')}
                icon={Assignment}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default CardGrid; // Exporta el componente CardGrid