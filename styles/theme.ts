import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  backgroundColor: '#F5F5F5',
  text: {
    heavy: '#222831',
    medium: '#C2B8A3',
    light: '#E6DDC6',
    flavour: '#355C7D',
  },
  widthBreakPoint: 1000
};

const darkTheme: DefaultTheme = {
  backgroundColor: '#222831',
  text: {
    heavy: '#F5F5F5',
    medium: '#E6DDC6',
    light: '#C2B8A3',
    flavour: '#B5EAEA',
  },
  widthBreakPoint: 1000
};

export { lightTheme, darkTheme }