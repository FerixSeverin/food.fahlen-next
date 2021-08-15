import Router from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logoutAuthentication } from '@features/authentication/authenticationReducer';

const Container = styled.div`
  
  color: ${props => props.theme.text.light};
  padding: 0 10px 0;
  display: flex;
  align-self: flex-end;

  #settings {
    margin-right: 20px;
  }

  #logout {
    background-color: ${props => props.theme.text.flavour2};
    padding: 0 10px 0;
  }
`;

export const AccountHeader: React.FC = () => {
  const dispatch = useDispatch();
  //const jwt = useSelector((state: RootState) => { return state.authentication.jwt; });
  
  return <Container>
    <button id='settings' onClick={() =>  Router.push('/account')}>⚙️</button>
    <button id='logout' onClick={() => {
      dispatch(logoutAuthentication());
      Router.push('/');
    }} >Log out</button>
    
  </Container>;
};
