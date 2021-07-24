import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  backgroundColor: '#F5F5F5',
  text: {
    heavy: '#222831',
    medium: '#C9D6DF',
    light: '#F5F5F5',
    flavour: '#355C7D',
    flavour2: '#F67280',
  },
  widthBreakPoint: 1000
};

const darkTheme: DefaultTheme = {
  backgroundColor: '#222831',
  text: {
    heavy: '#F5F5F5',
    medium: '#52616B',
    light: '#222831',
    flavour: '#B5EAEA',
    flavour2: '#FFCFDF',
  },
  widthBreakPoint: 1000
};

export { lightTheme, darkTheme }