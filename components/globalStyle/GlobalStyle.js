import { createGlobalStyle } from 'styled-components';

// Importa la función `createGlobalStyle` desde 'styled-components' para definir estilos globales.

// Define los estilos globales para el componente login.
const GlobalStyle = createGlobalStyle`  
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap');

 body {
    background: #5589c4;
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

export default GlobalStyle;  // Exporta el componente `GlobalLoginStyle` para que pueda ser utilizado en otras partes de la aplicación.
