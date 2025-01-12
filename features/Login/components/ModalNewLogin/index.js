// Importación de los componentes necesarios
import ButtonGroupExample from "../../../../components/Button/Button";
import Input from "../../../../components/input/input";
import Container from "../../../../components/container/container";
import Form from "../../../../components/form/form";
import GlobalLoginStyle from "../../../../components/globalStyle/GlobalLoginStyle";
import { useLogin } from "../../hooks/useLogin";
import { useAuth } from "../../hooks/logic";
import { Box } from "@mui/material";

// Componente ModalNewLogin para manejar el formulario de inicio de sesión
export default function ModalNewLogin() {
  // Desestructuración del hook useLogin para obtener las credenciales y el manejador de cambios
  const { credenciales, handleChange } = useLogin(); 

  // Desestructuración del hook useAuth para obtener la función login
  const { login } = useAuth(); 

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    await login(credenciales); // Llamada a la función login pasando las credenciales del usuario
  };

  return (
    <>
      <GlobalLoginStyle /> 
      <Container>
        {/* Título de la página */}
        <h1 style={{ textAlign: 'center' }}>Iniciar sesión</h1>

        {/* Descripción breve sobre lo que el usuario debe hacer */}
        <p style={{ textAlign: 'center' }}>Ingresá tus credenciales para acceder al área de administración.</p>

        {/* Formulario de inicio de sesión */}
        <Form id="login-form" onSubmit={handleSubmit}>
          {/* Campo de entrada para el correo */}
          <Input 
            type="text" 
            name="correo" 
            id="correo" 
            placeholder="Correo" 
            onChange={handleChange} // Llama a handleChange para actualizar el estado de las credenciales
          />
          
          {/* Campo de entrada para la contraseña */}
          <Input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Contraseña" 
            onChange={handleChange} // Llama a handleChange para actualizar el estado de las credenciales
          />

          {/* Botón de submit personalizado */}
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%',marginTop: 4 }}>
        <ButtonGroupExample variant="contained"
        type="submit"
        sx={{
          backgroundColor: 'green', // Color de fondo verde
          color: 'white', // Color del texto blanco
          '&:hover': {
            backgroundColor: '#388e3c', // Un verde más oscuro cuando el botón es hover
          },
        }}>
          Login
        </ButtonGroupExample>
      </Box>
        </Form>
      </Container>
    </>
  );
}
