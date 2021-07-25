import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

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
`

interface Props {
  loggedIn: boolean,
}

const Navigation: React.FC<Props> = (props) => {
  
  if (props.loggedIn === false) {
    return <Container>
      <Link href='/register' passHref><a>Register</a></Link>
      <Link href='/login' passHref><a>Login</a></Link>
    </Container>
  }

  return <Container>
    <Link href='/recipes' passHref><a>Recipes</a></Link>
    <Link href='/recipes/create' passHref><a>Create Recipe</a></Link>
  </Container>
  
  
}

export default Navigation