import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../styles/theme'
import Head from '../components/head'
import Link from 'next/link'

const Landing = styled.div`
  color: ${props => props.theme.text.flavour2};
  display: flex;
  flex-grow: 1;
  justify-content: center;
  font-size: 60px;
  font-weight: 600;
  white-space: pre;
  line-height: 1;
  flex-direction: column;

  .lower {
    display: flex;
    font-size: 30px;
  }

  .small {
    
    
    color: ${props => props.theme.text.heavy};
    
  }
`

const LandingRegisterLink = styled.a`
  width: 110px;
  height: 36px;
  text-align: center;
  color: ${props => props.theme.text.light};
  background-color: ${props => props.theme.text.flavour2};
  
`

export default function Home() {
  const landingBigText = 'Create, save\nand share recipes'
  const landingSmallText = 'Join now: '
  return (
    <Landing>
      <div>{ landingBigText }</div>
      <div className='lower'>
        <div className='small'>
          { landingSmallText }
        </div>
        <Link href='/register' passHref><LandingRegisterLink>Register</LandingRegisterLink></Link>
      </div>
    </Landing>
  )
}
