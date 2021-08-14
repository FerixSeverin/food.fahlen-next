import styled from 'styled-components';

const Container = styled.ul`
  width: 100%;
  background-color: #FF6B6B;
  padding-left: 24px;

  li {
    color: ${props => props.theme.form.flavour};
    font-size: 14px;
    
    padding: 10px;
  }
`;

interface IAlert {
  errors?: string[]
}

export const Alert: React.FC<IAlert> = (props) => {
  return <Container>
    { props.errors?.map((error) => (<li key={error}>{error}</li>))}
  </ Container>;
};
