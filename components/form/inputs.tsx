import styled from 'styled-components';

interface IInput {
  error?: boolean;
  width?: string;
  small?: boolean;
}
//1.5px solid ${props => props.theme.system.error}
const SimpleInput = styled.input<IInput>`
  border: ${props => props.error ? '1.5px solid ' + props.theme.system.error : 'none' };
  width: ${props => props.small ? '64px' : '154px'};
  background-color: ${props => props.small ? props.theme.form.flavour : props.theme.form.default};
  text-align: ${props => [props.small ? 'center' : 'left']};
`;

const BoxInput = styled.input`
  border: none;
`;

export { SimpleInput, BoxInput };
