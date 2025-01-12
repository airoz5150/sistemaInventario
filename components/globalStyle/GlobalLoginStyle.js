import { createGlobalStyle } from 'styled-components';

// Importa la función `createGlobalStyle` desde 'styled-components' para definir estilos globales.

// Define los estilos globales para el componente login.
const GlobalLoginStyle = createGlobalStyle`  
 body {
 
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Changed to 100vh for compatibility */
    font-size: larger;
    /* Sacado de https://css-pattern.com/ */
    --s: 200px; /* control the size */
    --c: #e1ecf2; /* first color */
    
    --_g: #0000 8%,var(--c) 0 17%,#0000 0 58%;
 
    background: linear-gradient(45deg, #004e92, #92ddbe, #3582ab, #77beea);
    background-size: 400% 400%; /* Aumenta el tamaño del fondo para que pueda moverse */
    animation: gradientAnimation 10s ease infinite; /* Animación que mueve el gradiente */
    transition: all 0.5s ease-in-out; /* Transición suave */
    min-height: 100vh; /* Asegura que el fondo cubra toda la pantalla */
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

`;

export default GlobalLoginStyle;  // Exporta el componente `GlobalLoginStyle` para que pueda ser utilizado en otras partes de la aplicación.
