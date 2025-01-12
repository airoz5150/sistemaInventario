import styled from "styled-components";

// Crea un componente estilizado llamado 'StyledContainer' que es un contenedor con estilos aplicados a través de styled-components
const StyledContainer = styled.div`
  .login-container {
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    padding: 50px;
    
  }
`;

// Define el componente funcional 'Container' que toma los 'children' como props
export default function Container({ children }) {
  // El componente 'StyledContainer' se usa para envolver los elementos hijos
  return (
    <StyledContainer>
       {/* El div con la clase 'login-container' contendrá los elementos hijos que se pasen al componente */}
      <div className="login-container">{children}</div>
    </StyledContainer>
  );
}
