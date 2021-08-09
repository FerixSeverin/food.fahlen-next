import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import Head from '../components/head';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '../features/reducer';
import Header from '../components/header';
// import { AuthProvider } from '../components/state/authProvider';

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

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [theme, setTheme] = useState(ThemeStyle.Light);

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setTheme(ThemeStyle.Dark);
    } else {
      setTheme(ThemeStyle.Light);
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme === ThemeStyle.Light ? lightTheme : darkTheme}>
          <ChakraProvider>
            <Background>
              <Head />
              <Wrapper>
                <Header theme={theme} setTheme={setTheme}/>
                <Main>
                  <Component {...pageProps} />
                </Main>
              </Wrapper>
            </Background>
          </ChakraProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>

  );
}
export default MyApp;
