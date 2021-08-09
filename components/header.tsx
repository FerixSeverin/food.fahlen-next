import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../features/reducer';
import { ThemeStyle } from '../pages/_app';
import { AccountHeader } from './accountHeader';
import Navigation from './navigation';

const Logo = styled.a`
  color: ${props => props.theme.text.flavour};
  font-size: 30px;
  font-weight: 600;
  line-height: 1.25;
`;

const Switches = styled.div`
  display: flex;
  align-items: center;
`;

const ThemeSwitch = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  height: 30px;
  width: 30px;
  background-color: rgba(0,0,0,0);
  //background-color: ${props => props.theme.text.heavy};
  font-size: 22px;
  cursor: pointer;
  margin-left: 10px;
`;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 20px 0 0;
`;

interface IHeader {
  theme: ThemeStyle,
  setTheme: React.Dispatch<React.SetStateAction<ThemeStyle>>,
}

const Header: React.FC<IHeader> = (props) => {
  const isAuthenticated = useSelector((state: RootState) => { return state.authentication.isAuthenticated; });

  const themeToggler = () => {
    if (props.theme === ThemeStyle.Light) {
      props.setTheme(ThemeStyle.Dark);
      localStorage.setItem('darkMode', 'true');
    } else {
      props.setTheme(ThemeStyle.Light);
      localStorage.setItem('darkMode', 'false');
    }
  };

  return <Container>
    <Link href='/' passHref><Logo>FOOD.Fahlen</Logo></Link>
    <Navigation />
    <Switches>
      { isAuthenticated && <AccountHeader /> }
      <ThemeSwitch onClick={themeToggler}>{props.theme === ThemeStyle.Light ? '🌚' : '🌝' }</ThemeSwitch>
    </Switches>
  </Container>;
};

export default Header;
