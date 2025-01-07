import { getThemeColor } from '../utils';

const colors = {
  greenHighlight: 'hsl(166, 79%, 47%)',
  backgroundPrimary: 'hsla(253, 71%, 37%, 1)',
  backgroundMenuPrimary: 'hsla(252, 71%, 21%, 1)',
  backgroundMenuSecondary: 'hsla(252, 70%, 30%, 1)',
  backgroundSecondary: '#FFFFFF',
  inputBackgroundContrasting: 'white',
  walletConnectButtonBackground: 'hsla(252,71%,50%,1)',
  walletConnectButtonBackgroundHover: 'hsl(252, 70.60%, 60.00%)',
  swapFormBoxShadow: 'rgba(0, 0, 0, 0.5)',
  textPrimary: '#FFFFFF',
  textContrasting: 'hsla(0, 0%, 5%, 1)',
  darkBackgroundPrimary: 'hsla(255, 20%, 3%, 1)',
  darkBackgroundMenuPrimary: 'hsla(240, 22%, 10%, 1)',
  darkBackgroundMenuSecondary: 'hsla(240, 15%, 15%, 1)',
  darkBackgroundSecondary: 'hsla(240,22%,10%,1)',
  darkBetSlipItemBackground: 'hsla(248, 8%, 20%, 1)',
  darkBetSlipItemIconBackground: 'hsla(0, 0%, 20%, 1)',
  darkBetSlipItemIconBorder: 'hsla(0, 0%, 80%, 1)',
  darkBetSlipItemIconBackgroundHover: 'rgb(36, 35, 41)',
  darkBetSlipItemIconBorderHover: 'rgb(36, 35, 41)',
  darkInputBackgroundContrasting: 'hsla(240, 21%, 21%, 1)',
  darkTextPrimary: '#1A1A1A',
  darkTextContrasting: '#FFFFFF',
  darkSwapFormBoxShadow: 'rgba(255, 255, 255, 0.2)',
  homePagePanelItemBackground: 'hsla(249, 68%, 60%, 1)',
  darkHomePagePanelItemBackground: 'hsla(240, 33%, 2%, 1)',
};

const opacity = {
  lightHeading: 1,
  darkHeading: 0.4,
  lightUnfocusedText: 1,
  darkUnfocusedText: 0.4,
};

const colorVals: ObjectOf<ColorValueType> = {
  gray: [
    { stop: 0, h: 249, s: 8 },
    { stop: 100, h: 240, s: 8 },
  ],
  green: [
    { stop: 0, h: 166, s: 47 },
    { stop: 100, h: 166, s: 47 },
  ],
  red: [
    { stop: 0, h: 8, s: 88 },
    { stop: 100, h: 8, s: 88 },
  ],
  purple: [
    { stop: 0, h: 255, s: 20 },
    { stop: 10, h: 255, s: 30 },
    { stop: 50, h: 255, s: 40 },
    { stop: 100, h: 255, s: 40 },
  ],
};

const breakpoints = [0, 480, 768, 1000, 1300, 1601, 1921];

const spacing = {
  outerGutterWidth: ['1rem', '1rem', '1.5rem', '1.5rem', '2rem', '2rem'],
  pageWrapperWidth: ['0', '0', '0', '0', '0', '100rem'],
};

const typography = {
  fontFamilyDefault: '"Figtree", sans-serif',
  fontFamilySecondary: '"Roboto Condensed", Arial, Helvetica, sans-serif',
};

const theme = {
  typography,
  colors,
  spacing,
  breakpoints,
};

export const themeSettings = {
  light: {
    mainBackground: theme.colors.backgroundPrimary,
    menuBackgroundPrimary: theme.colors.backgroundMenuPrimary,
    menuBackgroundSecondary: theme.colors.backgroundMenuSecondary,
    backgroundSecondary: theme.colors.backgroundSecondary,
    inputBackgroundContrasting: theme.colors.inputBackgroundContrasting,
    walletConnectButtonBackground: theme.colors.walletConnectButtonBackground,
    walletConnectButtonBackgroundHover: theme.colors.walletConnectButtonBackgroundHover,
    textPrimary: theme.colors.textPrimary,
    textContrasting: theme.colors.textContrasting,
    headingTextOpacity: opacity.lightHeading,
    swapFormBoxShadow: theme.colors.swapFormBoxShadow,
  },
  dark: {
    mainBackground: theme.colors.darkBackgroundPrimary,
    menuBackgroundPrimary: theme.colors.darkBackgroundMenuPrimary,
    menuBackgroundSecondary: theme.colors.darkBackgroundMenuSecondary,
    backgroundSecondary: theme.colors.darkBackgroundSecondary,
    inputBackgroundContrasting: theme.colors.darkInputBackgroundContrasting,
    walletConnectButtonBackground: theme.colors.walletConnectButtonBackground,
    walletConnectButtonBackgroundHover: theme.colors.walletConnectButtonBackgroundHover,
    textPrimary: theme.colors.darkTextPrimary,
    textContrasting: theme.colors.darkTextContrasting,
    headingTextOpacity: opacity.darkHeading,
    swapFormBoxShadow: theme.colors.darkSwapFormBoxShadow,
  },
};

export const color = {
  get: getThemeColor,
  gray: (lightness: number) => getThemeColor(colorVals.gray, lightness),
  green: (lightness: number) => getThemeColor(colorVals.green, lightness),
  red: (lightness: number) => getThemeColor(colorVals.red, lightness),
  purple: (lightness: number) => getThemeColor(colorVals.purple, lightness),
};

export default theme;
