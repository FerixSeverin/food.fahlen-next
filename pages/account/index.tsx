import styled from 'styled-components';

const Container = styled.div`
  margin-top: 20px;

  #delete {
    background-color: ${props => props.theme.system.error};
    line-height: 2;
    color: ${props => props.theme.text.heavy};
    border-radius: 5px;
    padding: 0 10px 0;
  }
`;

const Index: React.FC = () => {
  return <Container><button id='delete'>
    Delete this account
  </button></ Container>;
};

export default Index;
