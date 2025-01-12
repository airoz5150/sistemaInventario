import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Grid, TextField, MenuItem, InputLabel, Select,FormControl } from "@mui/material";
import Swal from "sweetalert2";



// Define la función getFormattedDate para obtener una fecha y hora formateada
const getFormattedDate = () => {
  const currentDate = new Date();  // Obtiene la fecha y hora actual
  const day = String(currentDate.getDate()).padStart(2, "0"); // Obtiene el día con formato de dos dígitos
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Obtiene el mes (los meses comienzan desde 0, por lo que se suma 1)
  const year = currentDate.getFullYear();  // Obtiene el año
  const hours = String(currentDate.getHours()).padStart(2, "0"); // Obtiene las horas con formato de dos dígitos
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");   // Obtiene los minutos con formato de dos dígitos
  return `Report_${day}-${month}-${year}_${hours}:${minutes}`;  // Retorna el nombre de reporte formateado
};

// Styled components para la estructura de la ventana emergente (modal)
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  text-align: center;
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
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

const ModalHeader = styled.h2`
  margin-bottom: 20px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  @media(max-width: 750px){
    flex-direction: column;
  }`

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


// Componente principal para la creación de empleados
const CreateEmployee = ({
  directionApi,
  title,
  customFields = [],
  onClose,
  onSave,
}) => {
  const [formValues, setFormValues] = useState({});   // Estado para almacenar los valores del formulario
  const [formErrors, setFormErrors] = useState({});   // Estado para almacenar los errores de validación
  
 // Filtra los campos personalizados para excluir el campo "_id"
  const filteredFields = customFields.filter((field) => field.name !== "_id");

   // Manejo de los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value })); // Actualiza el valor del campo en el estado
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    const errors = {};
    filteredFields.forEach((field) => {
      if (field.required && !formValues[field.name]?.trim()) {   // Verifica si el campo es requerido y está vacío
        errors[field.name] = `El campo "${field.label}" es obligatorio.`;   // Agrega un error si el campo está vacío
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);   // Actualiza el estado de errores si existen
      return;   // Detiene la ejecución si hay errores
    }

    // Genera un nombre único para el reporte basado en la fecha y hora
    const reportName = getFormattedDate();

     // Agrega el nombre del reporte a los valores del formularioo
    const dataToSend = { ...formValues, reportName };

    try {
       // Realiza la solicitud POST a la API para guardar los datos
      const res = await axios.post(`/api/${directionApi}`, dataToSend);

      if (res.status !== 201) {
        throw new Error("Error al crear el empleado"); 
         // Lanza un error si la respuesta no es 201
      }

      // Filtra la respuesta para eliminar el campo "__v" de la base de datos (versión)
      const { __v, ...filteredData } = res.data.data;
      onSave(filteredData);
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

   // Función para limpiar el formulario
  const onClean = () => {
    setFormValues({});  // Resetea los valores del formulario
    setFormErrors({});  // Resetea los errores
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>   {/* Muestra el título del modal */}
        <ModalForm onSubmit={handleSubmit}>  {/* Muestra el formulario */}
        <Grid container spacing={2} direction="column">
            {filteredFields.map((field) => (
              <Grid item xs={12} key={field.name}>
                <FormControl fullWidth error={Boolean(formErrors[field.name])}>
                  {field.type === "select" ? (
                    <>
                      <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                      <Select
                        id={field.name}
                        name={field.name}
                        value={formValues[field.name] || ""}
                        onChange={handleChange}
                        label={field.label}
                      >
                        {field.options.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  ) : field.type === "textarea" ? (
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      label={field.label}
                      variant="outlined"
                      fullWidth
                    />
                  ) : (
                    <TextField
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      label={field.label}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true, // Hace que el label siempre esté arriba, incluso si hay un valor
                      }}
                    />
                  )}
                  {formErrors[field.name] && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {formErrors[field.name]}
                    </div>
                  )}
                </FormControl>
              </Grid>
            ))}
            <Grid item xs={12} style={{ marginTop: '20px' }} />
          </Grid>
          <ButtonContainer>
            <StyledButton type="submit">Agregar</StyledButton>  {/* Botón para enviar el formulario */}
            <StyledButton type="button" onClick={onClose}>  
              Cancelar
            </StyledButton> {/* Botón para cerrar el modal */}
            <StyledButton type="button" onClick={onClean}>
              Limpiar
            </StyledButton> {/* Botón para limpiar el formulario */}
          </ButtonContainer>
        </ModalForm>
      </ModalContainer>
    </>
  );
};

export default CreateEmployee;
