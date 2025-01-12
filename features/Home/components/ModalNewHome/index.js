import GlobalStyle from '../../../../components/globalStyle/GlobalStyle';
import NavBar from '../../../../components/NavBar/Navbar';
import CardGrid from '../../../../components/CardGrid';
import styled from 'styled-components';

// Contenedor principal sin scroll
const NoScrollContainer = styled.div`
  height: auto; /* Altura completa de la ventana */
  overflow: hidden; /* Elimina el scroll vertical y horizontal */
`;

export default function ModalNewHome() {
  return (
    <>
      <GlobalStyle />
      <NoScrollContainer>
        <NavBar />
        <CardGrid />
      </NoScrollContainer>
    </>
  );
}
