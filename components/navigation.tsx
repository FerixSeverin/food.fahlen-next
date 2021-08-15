import Link from 'next/link';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { refreshAuthentication } from '@features/authentication/authenticationReducer';
import { RootState } from '@features/reducer';
// import { AuthContext } from './state/authProvider';

interface IContainer {
  columnDirection?: boolean
}

const Container = styled.nav<IContainer>`
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  align-items: ${props => props.columnDirection ? 'flex-end' : 'center'};
  flex-grow: 1;
  
  height: ${props => props.columnDirection ? '100px' : '100%'};;
  flex-direction: ${props => props.columnDirection ? 'column' : 'row'};
  margin-right: ${props => props.columnDirection ? '0' : '20px'};
  a {
    color: ${props => props.columnDirection ? props.theme.form.darkOnPink : props.theme.text.heavy};
    font-size: ${props => props.columnDirection ? '20px' : '22px'};
    
    font-weight: 600;
    margin-left: ${props => props.columnDirection ? '0' : '40px'};
  }
`;

interface INavigation {
  columnDirection?: boolean
}

const Navigation: React.FC<INavigation> = (props) => {
  console.log(props.columnDirection);
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
    return <Container columnDirection={props.columnDirection}>
      <Link href='/register' passHref><a>Register</a></Link>
      <Link href='/login' passHref><a>Login</a></Link>
    </Container>;
  }

  
  queryClient.invalidateQueries('recipes');
  return <Container columnDirection={props.columnDirection}>
    <Link href='/recipes' passHref><a>Recipes</a></Link>
    <Link href='/recipes/create' passHref><a>Create Recipe</a></Link>
  </Container>;
};

export default Navigation;
