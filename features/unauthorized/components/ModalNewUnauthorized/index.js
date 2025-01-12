import React, { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../../../components/globalStyle/GlobalStyle';

const Container = styled.div`
  display: flex;
  justify-content: center; /* Centra todo en el contenedor */
  align-items: center; /* Alinea verticalmente */
  height: 100vh; /* Altura completa de la ventana */
`;

const ImageContainer = styled.div`
  flex: 1; /* Toma todo el espacio disponible en la izquierda */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  flex: 1; /* Toma el espacio restante en la derecha */
  text-align: left; /* Alineación del texto a la izquierda */
  padding-left: 20px; /* Un pequeño margen para separar el texto de la imagen */
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #ffff;
  font-family: 'Montserrat', sans-serif;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
  color: #ffff;
  font-family: 'Montserrat', sans-serif;
`;

export default function ModalNewUnauthorized() {
  // Redirigir después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/Home'; 
    }, 3000); 

    // Limpiar el temporizador si el componente se desmonta antes de la redirección
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <ImageContainer>
          <img 
            src="/images/image.png"  // Aquí va la URL de tu imagen
            alt="Acceso Denegado"
            style={{ width: '100%', height: 'auto', maxWidth: '800px' }} // Ajusta el tamaño de la imagen
          />
        </ImageContainer>
        <TextContainer>
          <Title>Acceso Denegado</Title>
          <Message>No tienes permiso para acceder a esta página. Serás redirigido a la página principal...</Message>
        </TextContainer>
      </Container>
    </>
  );
}
