import { createGlobalStyle } from 'styled-components'
import { device } from './theme'

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        // Remove the blue highlight everytime we click on something on mobile
        -webkit-tap-highlight-color: transparent;
    }


    html {
        font-size: 62.5%;
        scroll-behavior: smooth;

        @media ${device.tablet} {
            font-size: 59%;
        }

        @media ${device.mobile} {
            font-size: 50%;
        }

        @media ${device.mobileS} {
            font-size: 46.5%;
        }

        @media ${device.mobileXS} {
            font-size: 41%;
        }
    }

    body {
        font-family: ${props => props.theme.fontFamily};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: ${props => props.theme.backgroundBlack};
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    // Mobile cliks
    .mbl-click:active:before {
        content: '';
        width: 5rem;
        height: 5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${props => props.theme.activeBackground};
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
        z-index: -1;
    }

    .mbl-click.word:active:before {
        width: 120%;
        height: 120%;
        border-radius:${props => props.theme.smallBorderRadius};
    }

    .nomargin {
        margin: 0 !important;
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
        background-color: ${props => props.theme.surfacesBlack} !important;
    }

    .MuiListItem-root.Mui-selected,
    .MuiListItem-root.Mui-selected:hover {
        background-color: rgba(0, 0, 0, .16) !important;
    }

    .MuiListItem-root {
        padding: 1.4rem 1rem !important;
    }

    .MuiMenuItem-root {
        color: ${props => props.theme.white} !important;
        font-size: 1.5rem !important;
        min-width: 15rem;
    }
    
    .MuiList-root .view-select-item {
        min-width: 30rem;
        min-height: 6rem;
    }

    .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
        color: ${props => props.theme.accent};
    }

    .ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
        stroke: ${props => props.theme.accent};
    }

    .ql-clean {
        display: none !important;
    }

    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-track {
        display: none;
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.accent};
        border-radius: 20px;
    }

    :focus {
        outline: none;
    }

    .react-tooltip-lite {
        background: ${props => props.theme.surfacesBlack};
        color: ${props => props.theme.white};
        border-radius: ${props => props.theme.smallBorderRadius};
        transform: translateY(-.5rem);
        font-size: 1.3rem;
        font-weight: ${props => props.theme.fontSemiBold};
        letter-spacing: .02rem;
        padding: 1rem 1.75rem !important;
        box-shadow: 7px 7px 16px 0 rgba(0,0,0,0.07);
        word-wrap: normal;
    }

    .tag-tooltip .react-tooltip-lite {
        font-size: 1rem;
    }

    @media ${device.tablet} {
        .react-tooltip-lite {
            display: none !important;
        }
        .visible-tooltip .react-tooltip-lite {
            display: inline-block !important;
        }
    }


    &.overflow:after,
    .page-header-wrapper:after {
        content: '';
        width: 100%;
        height: 4rem;
        position: absolute;
        right: 1rem;
        bottom: 1.5rem;
        background: ${props =>
          `linear-gradient(to top, ${props.theme.overflowBg} 50%, rgba(255, 255, 255, 0))`};
        z-index: 1;
    }

    .page-header-wrapper:after {
        bottom: -5.5rem;
        background: ${props =>
          `linear-gradient(to bottom, ${props.theme.overflowBg} 50%, rgba(255, 255, 255, 0))`};
    }
        
`
