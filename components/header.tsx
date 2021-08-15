import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@features/reducer';
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
  align-self: flex-end;
  z-index: 202;
`;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 20px 0 0;

  #normalHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  #menu {
    display: none;
    justify-content: space-between;
    align-items: flex-end;
  }

  @media (max-width: ${props => props.theme.headerBreakPoint}px) {
    #normalHeader {
      display: none;
    }
    #menu {
      display: block;
    }
  }
`;

const Menu = styled.div`
  height: 40px;
  width: 60px;
  border-radius: 10px;
  background-color: ${props => props.theme.form.flavour};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow: visible;
  #checkBoxLabel {
    display: flex;
    justify-content: center;
    align-self: center;
    line-height: 2.2;
  }

  input {
    display: none;
    cursor: pointer;
    height: 40px;
    width: 40px;
    opacity: 50%;
    z-index: 201;
  }
  #content {
    display: none;
    flex-direction: column;
    background-color: ${props => props.theme.form.flavour};
    
  }

  input:checked ~ #content {
    width: 100px;
    display: flex;
    padding: 10px;
    margin-right: 20px;
    z-index: 200;
  }
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
    <div id='normalHeader'>
      <Navigation />
      <Switches>
        { isAuthenticated && <AccountHeader /> }
        <ThemeSwitch onClick={themeToggler}>{props.theme === ThemeStyle.Light ? '🌚' : '🌝' }</ThemeSwitch>
      </Switches>
    </div>
    <div id='menu'>
      <Menu>
        <input type='checkbox' id='checkBoxToggle'/>
        <label id='checkBoxLabel' htmlFor='checkBoxToggle'>Menu</label>
        <div id='content'>
          <Navigation columnDirection/>
          <ThemeSwitch onClick={themeToggler}>{props.theme === ThemeStyle.Light ? '🌚' : '🌝' }</ThemeSwitch>
        </div>
        
      </Menu>
    </div>
    
  </Container>;
};

export default Header;
