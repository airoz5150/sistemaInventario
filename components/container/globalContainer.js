// Parent.js
// import React, { useState } from 'react'
import NavBar from '../NavBar/Navbar'
import InfoArea from '../infoArea/infoArea'


// Este componente contiene la estructura básica para incluir los componentes 'NavBar' y 'InfoArea' en su vista.
const Parent = () => {
  return (
    <ParentContainer>
  {/* Dentro de este contenedor se renderiza el componente NavBar. */}
      <div className='div2'>
        <NavBar />
      </div>
          {/* Dentro de este contenedor se renderiza el componente InfoArea. */}
      <div className='div3'>
        <InfoArea />
      </div>
    </ParentContainer>
  )
}

export default Parent
