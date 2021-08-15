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
  background-color: ${props => props.theme.form.default};
  text-align: ${props => [props.small ? 'center' : 'left']};
  padding-left: ${props => props.small ? '0' : '10px'};
`;

const BoxInput = styled.input`
  border: none;
  width: 100%;
  height: 80px;
`;

interface ILoginInput {
  light?: boolean;
}

const LoginInput = styled.input<ILoginInput>`
  background-color: ${props => props.light ? props.theme.form.default : props.theme.form.flavour};
  border-radius: ${props => props.theme.form.border_radius}px;
  width: 100%;
  height: 30px;
  padding-left: 8px;

  ::placeholder {
    color: ${props => props.theme.form.dark};
    font-size: 18px;
    padding-left: 8px;
    opacity: 50%;
  }
`;

export { SimpleInput, BoxInput, LoginInput };
