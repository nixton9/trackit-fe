import { darkTheme } from './src/styles/theme'

type CustomTheme = typeof darkTheme

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
