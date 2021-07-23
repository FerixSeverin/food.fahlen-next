import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../styles/theme'
import Head from '../components/head'

export enum ThemeStyle {
  Light,
  Dark,
}

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
`

const Main = styled.main`

`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0 10px;
`

const Wrapper = styled.div`
  width: ${props => props.theme.widthBreakPoint}px;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: ${props => props.theme.widthBreakPoint}px) {
    width: 100%;
    padding: 0 10px 0;
  }
`

const Logo = styled.div`
  color: ${props => props.theme.text.heavy};
  font-size: 30px;
`

const ThemeSwitch = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  height: 45px;
  width: 45px;
  background-color: rgba(0,0,0,0);
  //background-color: ${props => props.theme.text.heavy};
  font-size: 34px;
  cursor: pointer;
`

export default function Home() {
  const [theme, setTheme] = useState(ThemeStyle.Light);
  const themeToggler = () => {
    if (theme === ThemeStyle.Light) {
      setTheme(ThemeStyle.Dark);
      localStorage.setItem('darkMode', 'true');
    } else {
      setTheme(ThemeStyle.Light);
      localStorage.setItem('darkMode', 'false');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setTheme(ThemeStyle.Dark);
    } else {
      setTheme(ThemeStyle.Light);
    }
  }, []);
  
  return (
    <ThemeProvider theme={theme === ThemeStyle.Light ? lightTheme : darkTheme}>
      <Background>
        <Head />
        <Wrapper>
          <Header>
            <Logo>FOOD.Fahlen</Logo>
            <ThemeSwitch onClick={themeToggler}>{theme === ThemeStyle.Light ? '🌚' : '🌝' }</ThemeSwitch>
          </Header>
          <Main>

          </Main>
          {/* <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <p className={styles.description}>
              Get started by editing{' '}
              <code className={styles.code}>pages/index.js</code>
            </p>

            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>Documentation &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Learn &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/master/examples"
                className={styles.card}
              >
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
              >
                <h2>Deploy &rarr;</h2>
                <p>
                  Instantly deploy your Next.js site to a public URL with Vercel.
                </p>
              </a>
            </div>
          </main>

          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <span className={styles.logo}>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
              </span>
            </a>
          </footer> */}
        </Wrapper>
      </Background>
    </ThemeProvider>
  )
}
