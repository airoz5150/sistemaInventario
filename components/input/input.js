import styled from "styled-components";
import { Input } from "@mui/material";

export const StyledInput = styled.div`
  display: flex;
  justify-content: center;

  .login-input {
    margin: 15px;
    border-radius: 4px;
    padding: 15px 30px;
    font-size: ${props => props.size || 'large'};
  }
`;

// Define un componente funcional llamado InputComponent que acepta la propiedad 'size' y otras propiedades.
// Renderiza el componente 'Input' de Material UI, aplicando las propiedades adicionales pasadas a 'InputComponent'.
export default function InputComponent({ size, ...props }) {
  return (
    <StyledInput size={size}>
      <Input className="login-input" {...props} />
    </StyledInput>
  );
}
