import React, { useEffect, useState } from "react";
import GlobalStyle from "../../../../components/globalStyle/GlobalStyle"; // Importación del estilo global
import NavBar from "../../../../components/NavBar/Navbar"; // Importación del componente de la barra de navegación
import Table from "../../../../components/Table/Table"; // Importación del componente de la tabla
import styled from "styled-components";

const StyledContainer=styled.div`

@media (max-width: 1068px){
margin-left:10%;
justify-self: right;
flex-direction: column;
}

`

export default function ModalNewReports() {

  // Definición de los campos para la tabla de dispositivos móviles
  const inputsMoviles = [
    { name: "marca", label: "Marca", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "modelo", label: "Modelo", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "numeroSerie", label: "Numero Serie", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "correo", label: "Correo", type: "email", readOnly: false, required: true },
    { name: "respaldo", label: "Respaldo", type: "text", readOnly: false, required: true },
    { name: "estado", label: "Estado", type: "text", readOnly: false, required: true },
  ];

  // Definición de campos personalizados para las tablas de equipos
  const customFields = [
    { name: "marca", label: "Marca", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "modelo", label: "Modelo", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "SN", label: "SN", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "estado", label: "Estado", type: "text", readOnly: false, required: true },
  ];

  // Definición de campos personalizados para los dispositivos telefónicos
  const customFieldsTelefonica = [
    { name: "marca", label: "Marca", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "modelo", label: "Modelo", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "numeroExt", label: "NumeroExt", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "numeroSerie", label: "Numero Serie", type: "text", readOnly: false, allowLettersAndNumbers: true, required: true },
    { name: "estado", label: "Estado", type: "text", readOnly: false, required: true },
  ];

  
  return (
    <>
      <GlobalStyle /> {/* Estilo global para la página */}
      <NavBar /> {/* Componente de barra de navegación */}
      <div style={{ marginTop: "30px" }}>
        {/* Primer conjunto de tablas: mouse y teclado */}
        <StyledContainer style={{ display: "flex", justifyContent: "space-between", width: "90%", justifySelf: "center", height: "10%" }}>
          {/* Tabla de Mouse */}
          <div style={{ flex: 0.8, marginRight: "50px", width: "90%" }}>
            <div className="table-container">
              <Table
                customFields={customFields} // Campos personalizados
                apiURL="mouse" // URL de la API para mouse
                showAddButton={true} // Mostrar botón de agregar
                showGenerateReport={true} // Mostrar botón para generar reporte
                nameOfTable={"Mouse"} // Nombre de la tabla
                fila1Label={"name_of_equipment"} fila2Label={"serial_number"} // Etiquetas de las filas
                assignApi={"equipments"} // Asignación de la API
                asigmentApi={"equipments"} // API para asignación
                objetIdName={"contenidoMouse"} // Nombre de la variable para los datos
              >
                <th>Marca</th>
                <th>Modelo</th>
                <th>S/N</th>
                <th>Estado</th>
                <th>Acciones</th>
              </Table>
            </div>
          </div>
          {/* Tabla de Teclado */}
          <div style={{ flex: 0.8, width: "90%" }}>
            <div className="table-container">
              <Table
                nameOfTable={"Teclados"} // Nombre de la tabla
                customFields={customFields}
                apiURL="teclado"
                showAddButton={true}
                showGenerateReport={true}
                onClickReport={console.log("aqui va el inventario")}
                fila1Label={"name_of_equipment"} fila2Label={"serial_number"}
                assignApi={"equipments"} asigmentApi={"equipments"} objetIdName={"contenidoTeclado"}
              >
                <th>Marca</th>
                <th>Modelo</th>
                <th>S/N</th>
                <th>Estado</th>
                <th>Acciones</th>
              </Table>
            </div>
          </div>
        </StyledContainer>

        {/* Segundo conjunto de tablas: monitor y bocina */}
        <StyledContainer style={{ display: "flex", justifyContent: "space-between", width: "90%", justifySelf: "center", height: "10%" }}>
          {/* Tabla de Monitor */}
          <div style={{ flex: 0.8, marginRight: "50px",width: "90%" }}>
            <div className="table-container">
              <Table
                 nameOfTable={"Monitores"}
                customFields={customFields}
                apiURL="monitor"
                showAddButton={true}
                showGenerateReport={true}
                fila1Label={"name_of_equipment"} fila2Label={"serial_number"}
                assignApi={"equipments"} asigmentApi={"equipments"} objetIdName={"contenidoMonitores"}
              >
                <th>Marca</th>
                <th>Modelo</th>
                <th>S/N</th>
                <th>Estado</th>
                <th>Acciones</th>
              </Table>
            </div>
          </div>
          {/* Tabla de Bocina */}
          <div style={{ flex: 0.8, width: "90%" }}>
            <div className="table-container">
              <Table
                 nameOfTable={"Bocinas"}
                customFields={customFields}
                apiURL="bocina"
                showAddButton={true}
                showGenerateReport={true}
                fila1Label={"name_of_equipment"} fila2Label={"serial_number"}
                assignApi={"equipments"} asigmentApi={"equipments"} objetIdName={"contenidoBocinas"}
              >
                <th>Marca</th>
                <th>Modelo</th>
                <th>S/N</th>
                <th>Estado</th>
                <th>Acciones</th>
              </Table>
            </div>
          </div>
        </StyledContainer>

        {/* Tercer conjunto de tablas: telefonica y reguladores */}
        <StyledContainer style={{ display: "flex", justifyContent: "space-between", width: "90%", justifySelf: "center", height: "10%" }}>
          {/* Tabla de Telefonica */}
          <div style={{ flex: 0.8, marginRight: "50px", width: "90%" }}>
            <div className="table-container">
              <Table
                nameOfTable={"Telefonica"}
                apiURL="telefonica"
                showAddButton={true}
                showGenerateReport={true}
                customFields={customFieldsTelefonica}
                fila1Label={"name_of_equipment"} fila2Label={"serial_number"}
                assignApi={"equipments"} asigmentApi={"equipments"} objetIdName={"contenidoTelefonica"}
              >
                <th>Marca</th>
                <th>Modelo</th>
                <th>Numero de EXT</th>
                <th>Numero de serie</th>
                <th>Estado</th>
                <th>Acciones</th>
              </Table>
            </div>
          </div>
          {/* Tabla de Reguladores */}
          <div style={{ flex: 0.8,width: "90%" }}>
            <div className="table-container">
              <Table
                customFields={customFields}
                nameOfTable={"Reguladores"}
                apiURL="reguladores"
                showAddButton={true}
                showGenerateReport={true}
                fila1Label={"name_of_equipment"} fila2Label={"serial_number"}
                assignApi={"equipments"} asigmentApi={"equipments"} objetIdName={"contenidoReguladores"}
              >
                <th>Marca</th>
                <th>Modelo</th>
                <th>Numero de serie</th>
                <th>Estado</th>
                <th>Acciones</th>
              </Table>
            </div>
          </div>
        </StyledContainer>

        {/* Cuarto conjunto de tablas: móviles */}
        <div style={{ display: "flex", justifyContent: "space-between", width: "90%", justifySelf: "center", height: "10%" }}>
          {/* Tabla de Móviles */}
          <div style={{ flex: 1, width: "100%" }}>
            <div className="table-container">
              <Table
                customFields={inputsMoviles}
                nameOfTable={"Moviles"}
                apiURL="moviles"
                showAddButton={true}
                showGenerateReport={true}
                fila1Label={"name_of_equipment"} fila2Label={"serial_number"}
                assignApi={"equipments"} asigmentApi={"equipments"} objetIdName={"contenidoMoviles"}
              >
                <th>Marca</th>
                <th>Modelo</th>
                <th>Numero de serie</th>
                <th>Correo</th>
                <th>Respaldo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
