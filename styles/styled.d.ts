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
    form: {
      default: string,
      flavour: string,
    },
    system: {
      error: string,
    },
    widthBreakPoint: number
  }
}
