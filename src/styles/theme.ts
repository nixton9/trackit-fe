export const theme = {
  spacingXXS: '1rem',
  spacingXS: '1.5rem',
  spacingS: '3rem',
  spacingM: '6rem',
  spacingL: '9rem',
  spacingXL: '12rem',
  spacingXXL: '15rem',
  fontFamily: '"Poppins", sans-serif',
  fontExtraLight: 200,
  fontLight: 300,
  fontRegular: 400,
  fontMedium: 500,
  fontSemiBold: 600,
  fontBold: 700,
  fontExtraBold: 800,
  XSBorderRadius: '3px',
  smallBorderRadius: '10px',
  mainBorderRadius: '20px',
  bigBorderRadius: '30px',
  alwaysWhite: '#ffffff',
  habitsRed: '#fd1053',
  habitsGreen: '#23b14f',
  mainGradient:
    'linear-gradient(137deg, #2d325a 0%, #3d447e 73%, #3d447e 78%);',
  blueGradient: `linear-gradient(210deg, #08b0fd 0%, #81d1f5 100%);`,
  purpleGradient: `linear-gradient(210deg, #8925fd 0%, #be88fa 100%);`,
  pinkGradient: `linear-gradient(210deg, #fd0853 0%, #ef91ae 100%);`,
  greenGradient: `linear-gradient(210deg, #1db74d 0%, #5dffba 100%);`,
  blueColor: '#08b0fd',
  pinkColor: '#fd0853',
  greenColor: '#1db74d',
  accent: '#7D41FF',
  lightBlue: '#667698',
  darkBlue: '#2E3545',
  categories: {
    red: '#F44336',
    pink: '#E91E63',
    purple: '#9C27B0',
    indigo: '#3F51B5',
    blue: '#2196F3',
    blueGrey: '#607D8B',
    grey: '#9E9E9E',
    cyan: '#00BCD4',
    teal: '#009688',
    yellow: '#FFC107',
    orange: '#FF9800',
    green: '#4CAF50'
  }
}

export const darkTheme = {
  ...theme,
  white: '#fff',
  offWhite: '#dedede',
  black: '#111111',
  backgroundBlack: '#1F2128',
  hoverBlack: '#1d1f25',
  darkenAccent: '#3e2377',
  grey: '#757575',
  surfacesBlack: '#222733',
  activeBackground: '#30323a',
  inputAutofill: '#757575',
  widgetBg: '#1F2128',
  overflowBg: 'rgba(31, 33, 40, 1)'
}

export const lightTheme = {
  ...theme,
  white: '#333333',
  offWhite: '#444444',
  black: '#111111',
  backgroundBlack: '#ffffff',
  hoverBlack: '#ebecec',
  darkenAccent: '#3e2377',
  grey: '#9e9e9e',
  surfacesBlack: '#e4e4e4',
  activeBackground: '#cecece',
  inputAutofill: '#E0E0E0',
  widgetBg: '#dadada',
  overflowBg: 'rgba(255, 255, 255, 1)'
}

const size = {
  mobileXS: '320px',
  mobileS: '380px',
  mobile: '430px',
  mobileL: '550px',
  tabletXS: '700px',
  tablet: '1000px',
  tabletXL: '1200px',
  laptop: '1500px',
  laptopL: '1792px',
  desktop: '1920px',
  desktopL: '2200px',
  desktopXL: '2560px'
}

export const device = {
  mobileXS: `(max-width: ${size.mobileXS})`,
  mobileS: `(max-width: ${size.mobileS})`,
  mobile: `(max-width: ${size.mobile})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletXS: `(max-width: ${size.tabletXS})`,
  tablet: `(max-width: ${size.tablet})`,
  tabletXL: `(max-width: ${size.tabletXL})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktopL})`,
  desktopXL: `(max-width: ${size.desktopXL})`
}
