import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  backgroundColor: '#FEF7DC',
  text: {
    heavy: '#A19882',
    medium: '#C2B8A3',
    light: '#E6DDC6',
    flavour: '#B5EAEA',
  }
};

const darkTheme: DefaultTheme = {
  backgroundColor: '#A19882',
  text: {
    heavy: '#FEF7DC',
    medium: '#E6DDC6',
    light: '#C2B8A3',
    flavour: '#B5EAEA',
  }
};

export { lightTheme, darkTheme }