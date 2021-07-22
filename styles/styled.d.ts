import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string,
    text: {
      heavy: string,
      medium: string,
      light: string,
      flavour: string,
    }
  }
}