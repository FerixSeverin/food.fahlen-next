import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  backgroundColor: '#F5F5F5',
  text: {
    heavy: '#222831',
    medium: '#595260',
    light: '#F5F5F5',
    flavour: '#355C7D',
    flavour2: '#F67280',
  },
  form: {
    default: '#BEDCFA',
    flavour: '#F0D9E7',
    dark: '#125D98',
    border_radius: 5,
  },
  system: {
    error: '#E23E57',
  },
  widthBreakPoint: 1000
};

const darkTheme: DefaultTheme = {
  backgroundColor: '#222831',
  text: {
    heavy: '#F5F5F5',
    medium: '#B2B1B9',
    light: '#222831',
    flavour: '#B5EAEA',
    flavour2: '#FFCFDF',
  },
  form: {
    default: '#BEDCFA',
    flavour: '#F0D9E7',
    dark: '#6E85B2',
    border_radius: 5,
  },
  system: {
    error: '#E23E57',
  },
  widthBreakPoint: 1000
};

export { lightTheme, darkTheme };
