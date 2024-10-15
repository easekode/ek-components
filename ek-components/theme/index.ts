import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { alpha } from '@mui/system';

export const theme = createTheme({
  spacing: 2,
  direction: 'ltr',
  palette: { ...palette },

  shape: {
    borderRadius: 4,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.text.secondary,
          // fontWeight: 'normal',
          // padding: `${Sizing.PX8} ${Sizing.PX14}`,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          backgroundColor: '#EDF1FF',
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.background.default,
          // boxShadow: '3px 8px 25px -20px rgba(0, 0, 0, 0.6)',
          // boxShadow: theme.palette.background.paper,
          // boxShadow: 'none',
          // borderRadius: Sizing.PX16,
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {},
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {},
      },
    },
    MuiAccordionActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1),
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.background.paper,
          boxShadow: 'none',
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: 'none',
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },

    // MuiDialog: {
    //   styleOverrides: {
    //     paper: () => ({
    //       // width: '740px',
    //       // minHeight: '90vh',
    //       // maxWidth: '740px',
    //       // margin: '0px',
    //     }),
    //   },
    // },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.grey[900],
          fontSize: '0.8rem',
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.8rem',
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.8rem',
        },
      },
    },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       color: theme.palette.text.secondary,
    //     }),
    //   },
    // },
    // MuiStepper: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       color: theme.palette.secondary.main,
    //     }),
    //   },
    // },
    /* MuiStepLabel: {
      styleOverrides: {
        label: () => ({
          // fontSize: Sizing.PX16,
          // lineHeight: Sizing.PX19,
          color: theme.palette.secondary.main,
          '& .Mui-active': {
            color: 'yellow',
          },
        }),
        // disabled: () => ({
        //   color: 'red',
        // }),
      },
    },
    MuiStep: {
      styleOverrides: {
        root: () => ({
          padding: 0,
        }),
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: () => ({
          color: theme.palette.secondary.main,
          // '& .Mui-active': {
          //   color: 'yellow',
          // },
          // ':active': {
          //   color: 'green',
          // },
          // ':disabled': {
          //   color: 'red',
          // },
        }),
        // active: () => ({
        //   color: 'green',
        // }),

        // completed: () => ({
        //   color: 'blue',
        // }),

        // text: () => ({
        //   color: 'green',
        // }),
      },
    }, */
  },
});
