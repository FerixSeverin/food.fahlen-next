import Router from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logoutAuthentication } from '@features/authentication/authenticationReducer';

interface IContainer {
  columnDirection?: boolean
}

const Container = styled.div<IContainer>`
  color: ${props => props.theme.text.light};
  padding: ${props => props.columnDirection ? '0' : '0 10px 0'};
  display: flex;
  align-self: flex-end;
  flex-direction: ${props => props.columnDirection ? 'column' : 'row'};

  #settings {
    margin-right: ${props => props.columnDirection ? '0' : '20px'};
    align-self: ${props => props.columnDirection ? 'flex-end' : 'auto'};
    margin-bottom: ${props => props.columnDirection ? '10px' : '0'};;

  }

  #logout {
    background-color: ${props => props.theme.text.flavour2};
    padding: 0 10px 0;
  }
`;

interface IAccountHeader {
  columnDirection?: boolean
}

export const AccountHeader: React.FC<IAccountHeader> = (props) => {
  const dispatch = useDispatch();
  //const jwt = useSelector((state: RootState) => { return state.authentication.jwt; });
  
  return <Container columnDirection={props.columnDirection}>
    <button id='settings' onClick={() =>  Router.push('/account')}>⚙️</button>
    <button id='logout' onClick={() => {
      dispatch(logoutAuthentication());
      Router.push('/');
    }} >Log out</button>
    
  </Container>;
};
