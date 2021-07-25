import styled from "styled-components";

interface IInput {
  error?: boolean;
}
//1.5px solid ${props => props.theme.system.error}
const SimpleInput = styled.input<IInput>`
  border: ${props => props.error ? '1.5px solid ' + props.theme.system.error : 'none' };
  
`

const BoxInput = styled.input`
  border: none;
`

export { SimpleInput, BoxInput }