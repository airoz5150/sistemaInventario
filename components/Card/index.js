import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";

// Define el contenedor de la tarjeta (CardContainer) utilizando styled-components
const CardContainer = styled.div`
    position: relative;
    left: 2em;
  display: inline-grid;
  background-color: #ebebea;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin: 80px 20px 20px 20px;
  width: 300px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
`;

// Define el encabezado de la tarjeta (CardHeader) con estilo
const CardHeader = styled.h2`
  margin: 0 0 10px 0;
  text-align: center;
`;

// Define el detalle de la tarjeta (CardDetail) con estilo
const CardDetail = styled.p`
  margin: 5px 0;
`;

// Define el componente EmployeeCard que recibe las propiedades 'employee' y 'onGeneratePDF'
const EmployeeCard = ({ employee, onGeneratePDF }) => {

  return (
    <CardContainer>  {/* Usa el contenedor de la tarjeta estilizado */}
      <CardHeader>{employee.name}</CardHeader>
      <CardDetail>
        <strong>Apellido:</strong> {employee.lastname}
      </CardDetail>
      <CardDetail>
        <strong>Teléfono:</strong> {employee.phone}
      </CardDetail>
      <CardDetail>
        <strong>Correo:</strong> {employee.address}
      </CardDetail>
      <CardDetail>
        <strong>Posicion:</strong> {employee.position}
      </CardDetail>
      <Button
        type="button"
        onClick={() => onGeneratePDF(employee)}
        fondo="#2e4ead"
        color="white"
      >
        Generar reporte 
      </Button>
    </CardContainer>
  );
};

// Exporta el componente EmployeeCard para que pueda ser utilizado en otros archivos
export default EmployeeCard;
