import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import PeopleIcon from '@mui/icons-material/People';


const TextContainer = styled.div`
  width: auto;
  max-width: 600px;
  text-align: center;
  padding-top: 80px;
  margin: 0 auto;
  border-radius: 50%;
`;

const P = styled.p`
  font-size: 18px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  
  
  text-shadow: 8px 8px 13px rgba(0.2, 0.3, 0.4, 0.5);
  color: #ffffff; /* Azul claro */
  font-weight: 400;
`;

const SocialLink = styled.a`
  background: #0078D4;
  color: #fff;
  padding: 14px 40px;
  font-size: 20px;
  text-decoration: none;
  display: inline-block;
  border-radius: 30px;
  transition: all 0.4s ease;

  &:hover {
    background-color: #005A8C;
    transform: translateY(-6px);
  }
`;

const ContentSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
    
`;

const ContentContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  width: 300px;
   padding: 20px;
  text-align: center;
  border-radius: 10px;
  opacity: 100;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;  
  text-align: center;
  text-shadow: 8px 8px 13px rgba(0.2, 0.3, 0.4, 0.5);
  box-shadow: 5px 5px 10px rgba(0, 0.1, 0.2, 0.2);
`;

const Description = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 24px;
    color: #00B0FF;
    margin-bottom: 10px;
  }

  p {
    font-size: 20px;
    color: #ffffff;
    
  }
`;

const FooterContent = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
    display: flex;
  flex-direction: column;
  margin-top: 5%;

`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;


const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #5589c4;
    
    text-shadow: 8px 8px 13px rgba(0.2, 0.3, 0.4, 0.5);
  }


  @keyframes slideIn {
    {
      opacity: 0;
      
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }



  h1, h2, h3 {
    font-family: 'Montserrat', sans-serif;
    color: #00B0FF;
    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
   
  }

  h6 {
    font-family: "Funnel Display", sans-serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
  }

  .cta-button {
    background-color: #0078D4;
    color: #fff;
    padding: 14px 40px;
    display: inline-block;
    font-size: 20px;
    margin-top: 30px;
    border-radius: 30px;
    transition: all 0.4s ease;

    &:hover {
      background-color: #005A8C;
      transform: translateY(-6px);
    }
  }

  
 

`;

export default function welcomePage() {


  return (
    <>
      <GlobalStyle />


      <TextContainer>

        <h1>Bienvenido al Sistema de Inventario</h1>
      </TextContainer>

      <ContentSection>


        <ContentContainer>

          <PeopleIcon style={{ fontSize: 100 }} />
          <Description>
            <p>Accede a todas las funcionalidades.</p>
            <SocialLink href="/login" className="cta-button">Iniciar Sesión</SocialLink>
          </Description>
        </ContentContainer>
      </ContentSection>
      <FooterContent>

        <p>© 2024 . Todos los derechos reservados.</p>
      </FooterContent>

    </>
  );
}
