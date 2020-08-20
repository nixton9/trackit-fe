import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: ${props => props.theme.fontFamily};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: ${props => props.theme.darkerBlue};
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input,
    textarea,
    button {
        outline: none;
        font-family: ${props => props.theme.fontFamily};
    }

    .MuiInput-root,
    .MuiMenuItem-root {
        font-family: ${props => props.theme.fontFamily} !important;
    }

    .MuiPopover-paper {
        background-color: ${props => props.theme.surfacesBlue} !important;
    }

    .MuiListItem-root.Mui-selected,
    .MuiListItem-root.Mui-selected:hover {
        background-color: ${props => props.theme.greyishBlue} !important;
    }

    .MuiMenuItem-root {
        color: ${props => props.theme.white} !important;
        font-size: 1.5rem !important;
    }

    .MuiList-root .view-select-item {
        min-width: 30rem;
        min-height: 6rem;
    }
`
