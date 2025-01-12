import styled from "styled-components";

// Definición de un componente de párrafo estilizado con styled-components
const Error = styled.p`
  text-align: center; /* Cambia esto a texto alineado al centro */
  display: ${props => (props.visible ? 'block' : 'none')}; /* Cambia a 'block' o 'none' según la propiedad visible */
`;

// Componente funcional Parrafo
export default function Parrafo({ children, visible }) {
  return <Error visible={visible}>{children}</Error>; // Retorna el componente Error, pasando la propiedad 'visible' y el contenido (children)
}
