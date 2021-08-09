import Link from 'next/link';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { refreshAuthentication } from '../features/authentication/authenticationReducer';
import { RootState } from '../features/reducer';
// import { AuthContext } from './state/authProvider';

const Container = styled.nav`
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  align-items: center;
  flex-grow: 1;
  a {
    color: ${props => props.theme.text.heavy};
    font-size: 22px;
    font-weight: 600;
    margin-left: 40px;
  }
`;

const Navigation: React.FC = () => {
  // const [authState] = useContext(AuthContext);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (localStorage.getItem('refresh')) {
      dispatch(refreshAuthentication());
    }
  });

  const isAuthenticated = useSelector(((state: RootState) => { return state.authentication.isAuthenticated; }));
  
  if (isAuthenticated === false) {
    return <Container>
      <Link href='/register' passHref><a>Register</a></Link>
      <Link href='/login' passHref><a>Login</a></Link>
    </Container>;
  }

  
  queryClient.invalidateQueries('recipes');
  return <Container>
    <Link href='/recipes' passHref><a>Recipes</a></Link>
    <Link href='/recipes/create' passHref><a>Create Recipe</a></Link>
  </Container>;
};

export default Navigation;
