import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//iconos
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CableIcon from '@mui/icons-material/Cable';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAuth from '../Table/hooks/useAuth';

const BackButton = () => { // Componente funcional para el botón "Regresar"
  const router = useRouter(); // Usa el hook de Next.js para manejar la navegación.

  const handleBack = () => {  // Función para regresar a la página anterior.
    router.back(); // Llama a la función 'back' para volver a la página anterior.
  };

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="back"
      onClick={handleBack}

    >
      <ArrowBackIcon />
    </IconButton>
  );
};


const drawerWidth = 240;  // Define el ancho del panel lateral.

const openedMixin = (theme) => ({  // Función para el estilo cuando el panel lateral está abierto.
  width: drawerWidth,
  transition: theme.transitions.create('width', { // Configura la transición del ancho.
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Función para el estilo cuando el panel lateral está cerrado.
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Crea un componente de estilo para el encabezado del panel lateral.
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

 // Estilo personalizado para la AppBar.
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Estilo personalizado para el Drawer (panel lateral).
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function NavBar() { // Componente principal que renderiza la barra de navegación.
  const theme = useTheme(); // Obtiene el tema de MUI.
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable
  const [isEditOpen, setIsEditOpen] = useState(false); // Estado del formulario
  const [name, setName] = useState(''); // Nombre actual del usuario
  const [newName, setNewName] = useState(''); // Nuevo nombre temporal
  const [profileImage, setProfileImage] = useState('/images/default-profile.png');
  const [newImage, setNewImage] = useState(null); // Estado para la nueva imagen seleccionada
  const { id, correo, userName } = useAuth()



  useEffect(() => {  // Hook useEffect que se ejecuta al montar el componente.
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (token) {  // Si el usuario tiene un token.
      const decodedToken = jwtDecode(token);  // Decodifica el token JWT.
      setRole(decodedToken.role);  // Establece el rol del usuario decodificado.
      setName(decodedToken.name);  // Establece el nombre del usuario decodificado.
    }
  }, []); // Dependencia del usuario para actualizar el estado al cambiar.

  const handleDrawerOpen = () => { // Función para abrir el Drawer.
    setOpen(true);  
  };

  const handleDrawerClose = () => {   // Función para cerrar el Drawer.
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setRole(null);
    window.location.href = '/';
    handleMenuClose();
  };

  const handleEditProfileOpen = () => {
    setIsEditOpen(true);
    setNewName(name);
    handleMenuClose();
  };

  const handleEditProfileClose = () => {
    setIsEditOpen(false);
  };

  const handleSaveProfile = () => {
    setName(userName); // Actualizar el nombre
    setIsEditOpen(false);
    console.log('Nombre actualizado:', userName);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Crear una URL para previsualizar la imagen
      setNewImage(file);
      setProfileImage(URL.createObjectURL(file)); // Mostrar la imagen seleccionada en la vista
    }
  };
  
  // Función para manejar la imagen y enviarla a la base de datos
  const handleSaveProfileWithImage = () => {
    if (newImage) {
      const formData = new FormData();
      
      // Agregar el archivo directamente al FormData
      formData.append('profileImg', newImage); // Añadir la imagen sin convertirla a Buffer
      
      // Imprimir para depuración
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      // Enviar los datos al servidor
      fetch(`/api/Users?id=${id}`, {
        method: 'PUT',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Imagen actualizada exitosamente', data);
        })
        .catch(error => {
          console.error('Error al actualizar la imagen', error);
        });
    }
  
    // Llamar al método de guardar (presumo que esto es para guardar otros datos del usuario)
    handleSaveProfile();
  };
  
  

  const renderLinks = () => {
    if (role === 'admin') {
      return (
        <>
          <Tooltip title="Home" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/Home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Empleados" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/Employees">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Empleados" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Equipos" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/Equipments">
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary="Equipos" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Actividades" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/Activities">
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Actividades" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Periféricos" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/Peripherals">
              <ListItemIcon>
                <CableIcon />
              </ListItemIcon>
              <ListItemText primary="Periféricos" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Reportes" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/Reports">
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Reportes" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Usuarios" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/users">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </Tooltip>
        </>
      );
    }
    if (role === 'user') {
      return (
        <>
          <Tooltip title="Home" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/Home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Actividades Asignadas" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/AsignedActivities">
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Actividades" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Reportes" arrow placement="right" disableHoverListener={open}>
            <ListItemButton component={Link} href="/Reports">
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Reportes" />
            </ListItemButton>
          </Tooltip>
        </>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#5589c4' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2, // Espaciado entre el icono de menú y el botón de regresar
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <BackButton />
            Regresar
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{ marginLeft: 1, fontWeight: 'bold', color: 'white' }}
            >
                {/* Aquí va la palabra que quieres agregar */}
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditProfileOpen}>Editar Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer  variant="permanent" open={open} >
      <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderLinks()}</List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3,position:"relative" }}>
        <DrawerHeader />
      </Box>


      {/* Formulario Modal */}
      <Dialog open={isEditOpen} onClose={handleEditProfileClose}>
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        {/* Imagen de perfil */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ position: 'relative', width: 80, height: 80 }}>
            <img
              src={profileImage || 'default-profile-image-url.jpg'} // Si no hay imagen seleccionada, mostrar una por defecto
              alt="Imagen de perfil"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#fff',
                boxShadow: 1,
                p: 0.5,
              }}
            >
              <PhotoCameraIcon fontSize="small" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange} // Actualizar la imagen
              />
            </IconButton>
          </Box>
        </Box>

        {/* Nombre de usuario */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          value={userName} // Mostrar el nombre actual o el nuevo nombre
          onChange={(e) => setUserName(e.target.value)} // Actualizar el nombre
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditProfileClose}>Cancelar</Button>
        <Button onClick={handleSaveProfileWithImage}>Guardar</Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
}
