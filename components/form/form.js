import styled from "styled-components";

// Definición de un componente estilizado para el formulario
export const StyledForm = styled.div`
.login-form {
        display: flex;
    flex-direction: column;
    align-items: center;

    };
`

// Componente funcional Form
export default function Form({ children, ...props }) {
    return (
        <StyledForm>  {/* Contenedor estilizado de StyledForm */}
            <form className="login-form" {...props}>  {/* Aplica las propiedades pasadas al componente form, como clases o estilos adicionales */}
                {children}   {/* Renderiza el contenido (children) dentro del formulario */}
            </form>
        </StyledForm>
    )

}