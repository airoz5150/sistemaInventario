import React from "react";
import styled from "styled-components";
import Button from "../Button/Button"; // Si necesitas el botón, lo puedes incluir en tu código
import InputComponent from "../input/input";
import { TextField } from "@mui/material";

// Crea un componente estilizado llamado StyledSearchBox utilizando styled-components.
const StyledSearchBox = styled.div`
  margin-bottom: 20px;
  width: 90%;
  display: flex;
  justify-content: flex-end; /* Alinea el contenido al final (a la derecha) */
  align-items: center; /* Centra el contenido verticalmente */

  
`;

// Componente funcional que acepta props: searchTerm, setSearchTerm y onAddNew.
const SearchBox = ({ searchTerm, setSearchTerm, onAddNew }) => {
  return (
    <StyledSearchBox>
      <TextField
       fullWidth  
      id="standard-basic" label="Buscar..." variant="standard"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Cada vez que el valor del campo cambia, se actualiza el estado searchTerm llamando a setSearchTerm
      />
    </StyledSearchBox>
  );
};

export default SearchBox;  // Exporta el componente SearchBox para que pueda ser usado en otros lugares de la aplicación.
