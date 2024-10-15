// import { PaletteOptions } from '@mui/material/styles';
// /* declare module '@mui/material/styles' {
//   interface PaletteOptions {
//     custom?: {
//       main?: string;
//     };
//     // shadow?: {
//     //   main?: string;
//     // };
//     // footer: {
//     //   main?: string;
//     // };
//   }
// }
//  */
// const defaultPalette: PaletteOptions = {
//   mode: 'light',
//   common: {
//     black: '#000',
//     white: '#fff',
//   },
//   primary: {
//     main: '#1F253D',
//   },
//   secondary: {
//     main: '#FF5202',
//   },
//   error: {
//     main: '#d32f2f',
//   },
//   warning: {
//     main: '#ed6c02',
//   },
//   info: {
//     main: '#0288d1',
//   },
//   success: {
//     main: '#2e7d32',
//   },
//   text: {
//     primary: '#000000',
//     secondary: '#ffff', // #e0e0e0,   #03a9f4
//     disabled: 'rgba(0, 0, 0, 0.38)',
//   },
//   grey: {
//     50: '#fafafa',
//     100: '#f5f5f5',
//     200: '#eeeeee',
//     300: '#e0e0e0',
//     400: '#bdbdbd',
//     500: '#434343', //shortDescription color
//     600: '#8C8C8C', //mediumDescription color
//     700: '#616161',
//     800: '#424242',
//     900: '#212121',
//     A100: '#f5f5f5',
//     A200: '#eeeeee',
//     A400: '#bdbdbd',
//     A700: '#616161',
//   },

//   contrastThreshold: 3,
//   tonalOffset: 0.2,
//   divider: '#9e9e9e',
//   background: {
//     paper: '#f5f5f5', // light gray
//     default: '#fafafa', // very light gray
//   },
//   action: {
//     active: 'rgba(0, 0, 0, 0.54)',
//     hover: 'rgba(0, 0, 0, 0.04)',
//     hoverOpacity: 0.04,
//     selected: 'rgba(0, 0, 0, 0.08)',
//     selectedOpacity: 0.08,
//     disabled: 'rgba(0, 0, 0, 0.26)',
//     disabledBackground: 'rgba(0, 0, 0, 0.12)',
//     disabledOpacity: 0.38,
//     focus: 'rgba(0, 0, 0, 0.12)',
//     focusOpacity: 0.12,
//     activatedOpacity: 0.12,
//   },
// };

// export const palette: PaletteOptions = {
//   ...defaultPalette,
// };

import { alpha, PaletteOptions } from '@mui/material/styles';

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  50: '#ffccbc',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#FAFBFF',
  500: '#D2DBFF',
  600: '#475177',
  700: '#606A94',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
  main: '#1F253D',
  light: '#4b5063',
  dark: '#15192a',
};
const SECONDARY = {
  main: '#FF5202',
  light: '#ff7434',
  dark: '#b23901',
};
const INFO = {
  main: '#0288d1',
  light: '#349fda',
  dark: '#015f92',
};
const SUCCESS = {
  main: '#2e7d32',
  light: '#57975b',
  dark: '#205723',
};
const WARNING = {
  main: '#ed6c02',
  light: '#f08934',
  dark: '#a54b01',
};
const ERROR = {
  main: '#d32f2f',
  light: '#db5858',
  dark: '#d32f2f',
};
const BACKGROUND = {
  // paper: '#ffccbc',
  default: '#fff',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  chart: CHART_COLORS,
  background: BACKGROUND,
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export const palette: PaletteOptions = {
  ...COMMON,
};
