import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, TextField, InputLabel  } from '@mui/material';
import Swal from "sweetalert2";

// Estilos usando styled-components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Contenedor del modal
const ModalContainer = styled.div`
  text-align: center;
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  width:50%;
  height: 70%;
  overflow-y: scroll;
  @media(max-width 750px){
  height: 80%;
  overflow-y: scroll; 
  }
`;

// Estilo para el encabezado del modal
const ModalHeader = styled.h2`
  margin-bottom: 20px;
`;

// Estilo para el formulario del modal
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

// Contenedor de botones con espacio entre ellos
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  @media(max-width: 750px){
    flex-direction: column;
  }

`;

// Estilo de los botones
const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:last-child {
    background-color: #f44336;
  }

  &:hover {
    opacity: 0.9;
  }
`;



// Función para obtener la fecha formateada
const getFormattedDate = () => {
  const currentDate = new Date();  // Obtiene la fecha actual
  const day = String(currentDate.getDate()).padStart(2, '0'); // Obtiene el día con formato de 2 dígitos
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (los meses comienzan desde 0)
  const year = currentDate.getFullYear(); // Obtiene el año
  const hours = String(currentDate.getHours()).padStart(2, '0'); // Obtiene la hora
  const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Obtiene los minutos
  return `${year}-${month}-${day} ${hours}:${minutes}`; // Devuelve la fecha formateada
};

// Componente EditCard
const EditCard = ({ title, customFields, data, onClose, onSave, apiDirection }) => {
  const [formValues, setFormValues] = useState({}); // Estado para los valores del formulario

   // Efecto que se ejecuta cuando el componente se monta o cuando los datos cambian
  useEffect(() => {
    if (data) {
      setFormValues(data);  // Establece los datos recibidos en el estado del formulario
    }

       // Establece la fecha actual cuando el componente se monta
    setFormValues((prev) => ({
      ...prev,
      fecha: getFormattedDate(), // Actualiza la fecha en el estado
    }));
  }, [data]);  // Dependencia de los datos

  const filteredFields = customFields.filter((field) => field.name !== "_id");

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;  // Extrae el nombre y el valor del input

    // Validación de los campos (por ejemplo, solo letras y números en los campos adecuados)
    const isTextField = filteredFields.find(field => field.name === name && field.type === 'text');
    const isNumberField = filteredFields.find(field => field.name === name && field.type === 'number');

    const isTextValid = isTextField ? value.split('').every(char => {
      const code = char.charCodeAt(0);
      return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code === 32; // A-Z, a-z y espacio
    }) : true;

    // Validación de números (solo dígitos)
    const isNumberValid = isNumberField ? value.split('').every(char => {
      const code = char.charCodeAt(0);
      return code >= 48 && code <= 57; // 0-9
    }) : true;

     // Si la validación es exitosa, actualiza el estado del formulario
    if ((isTextValid || !isTextField) && (isNumberValid || !isNumberField)) {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

    // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       // Realiza una solicitud PUT para actualizar los datos en la API
      const response = await fetch(`/api/${apiDirection}?id=${formValues._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues), // Envia los valores del formulario
      });

      if (!response.ok) {
        throw new Error("Error en la actualización"); // Lanza un error si la respuesta no es exitosa
      }

      const result = await response.json();  // Obtiene la respuesta JSON
      onSave(result.data);
      onClose(); // Cierra el modal
    } catch (error) {
       Swal.fire({
              title: 'Error!',
              text:'Correo existente',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
    }
  };

  // Función para limpiar los campos del formulario
  const onClean = () => {
    setFormValues((prev) => ({ _id: prev._id }));
  };

   // Renderiza el modal
  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
            {filteredFields.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                {field.type === 'select' ? (
                  
                  <TextField
                    id={field.name}
                    name={field.name}
                    value={formValues[field.name] || ""}
                    onChange={!field.readOnly ? handleChange : undefined}
                    select
                    fullWidth
                    required={!field.readOnly}
                    disabled={field.readOnly}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {field.options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                ) :  field.type === "textarea" ? (
                   <TextField
                      id={field.name}
                      name={field.name}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                 />
                ) : (
                  <TextField
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formValues[field.name] || ""}
                    onChange={!field.readOnly ? handleChange : undefined}
                    fullWidth
                    required={!field.readOnly}
                    disabled={field.readOnly}
                    
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12} style={{ marginTop: '20px' }} />
          </Grid>
          <ButtonContainer>
            <StyledButton type="submit">Guardar</StyledButton>
            <StyledButton type="button" onClick={onClose}>Cancelar</StyledButton>
            <StyledButton type="button" onClick={onClean}>Limpiar</StyledButton>
          </ButtonContainer>
        </ModalForm>
      </ModalContainer>
    </>
  );
};

export default EditCard; // Exporta el componente EditCard
