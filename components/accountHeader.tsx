import Router from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logoutAuthentication } from '../features/authentication/authenticationReducer';

const Container = styled.div`
  background-color: ${props => props.theme.text.flavour2};
  color: ${props => props.theme.text.light};
  padding: 0 10px 0;
  display: flex;

  button {
    height: 20px;
    width: 20px;
  }
`;

export const AccountHeader: React.FC = () => {
  const dispatch = useDispatch();
  //const jwt = useSelector((state: RootState) => { return state.authentication.jwt; });
  
  return <Container>
    <button onClick={() => {
      dispatch(logoutAuthentication());
      Router.push('/');
    }} />
    
  </Container>;
};
