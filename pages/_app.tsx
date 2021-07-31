import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import Head from '../components/head';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from '../components/navigation';
import { ChakraProvider } from '@chakra-ui/react';

const Background = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: center;

  @media (max-width: ${props => props.theme.widthBreakPoint}px) {
    min-height: 97vh;
  }
`;

export enum ThemeStyle {
  Light,
  Dark,
}

const ThemeSwitch = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  height: 45px;
  width: 45px;
  background-color: rgba(0,0,0,0);
  //background-color: ${props => props.theme.text.heavy};
  font-size: 30px;
  cursor: pointer;
`;

const Logo = styled.a`
  color: ${props => props.theme.text.flavour};
  font-size: 30px;
  font-weight: 600;
  line-height: 1.25;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 20px 0 0;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
`;

const Wrapper = styled.div`
  width: ${props => props.theme.widthBreakPoint}px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.widthBreakPoint}px) {
    width: 100%;
    padding: 0 10px 0;
  }
`;

const Switches = styled.div`
  display: flex;
  align-items: center;
`;

interface LoggedInSwitchProps  {
  isLoggedIn: boolean,
}

const LoggedInSwitch = styled.button<LoggedInSwitchProps>`
  border: none;
  font-size: 14px;
  margin-right: 20px;
  color: ${props => props.theme.text.light};
  background-color: ${props => props.isLoggedIn ? props.theme.text.flavour2 : props.theme.text.flavour};
`;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [theme, setTheme] = useState(ThemeStyle.Light);
  const [login, setLogin] = useState(false);
  const themeToggler = () => {
    if (theme === ThemeStyle.Light) {
      setTheme(ThemeStyle.Dark);
      localStorage.setItem('darkMode', 'true');
    } else {
      setTheme(ThemeStyle.Light);
      localStorage.setItem('darkMode', 'false');
    }
  };

  const loggedInToggler = () => {
    if (login === false) {
      setLogin(true);
      localStorage.setItem('login', 'true');
    } else {
      setLogin(false);
      localStorage.setItem('login', 'false');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setTheme(ThemeStyle.Dark);
    } else {
      setTheme(ThemeStyle.Light);
    }

    if (localStorage.getItem('login') === 'true') {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === ThemeStyle.Light ? lightTheme : darkTheme}>
        <ChakraProvider>
          <Background>
            <Head />
            <Wrapper>
              <Header>
                <Link href='/' passHref><Logo>FOOD.Fahlen</Logo></Link>
                <Navigation loggedIn={login} />
                <Switches>
                  <LoggedInSwitch isLoggedIn={login} onClick={loggedInToggler}>{login === true ? 'User' : 'Guest'}</LoggedInSwitch>
                  <ThemeSwitch onClick={themeToggler}>{theme === ThemeStyle.Light ? '🌚' : '🌝' }</ThemeSwitch>
                </Switches>
                
              </Header>
              
              <Main>
                <Component {...pageProps} />
              </Main>
            </Wrapper>
          </Background>
        </ChakraProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
