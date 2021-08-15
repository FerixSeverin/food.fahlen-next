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
      dark: string,
      darkOnPink: string,
      border_radius: number,
    },
    system: {
      error: string,
    },
    widthBreakPoint: number,
    headerBreakPoint: number
  }
}
