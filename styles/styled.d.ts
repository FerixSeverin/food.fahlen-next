import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string,
    text: {
      heavy: string,
      medium: string,
      light: string,
      flavour: string,
      flavour2: string,
    },
    widthBreakPoint: number
  }
}