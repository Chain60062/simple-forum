import { createStitches } from '@stitches/react';

const stitches = createStitches({
  media: {
    breakpoint600: '(max-width: 600px)',
    breakpoint900: '(max-width: 900px)',
    breakpoint1100: '(max-width: 1100px)',
  },
  theme: {
    colors: {
      primary: '#a11062',
      primaryShade: '#800c4e',
      primaryBright: '#b33f81',
      secondary: '#680ff7',
      secondaryShade: '#5d0dde',
      background: '#e4dff2',
    },
    space: {
      xs: '0.563rem',
      sm: '0.75rem',
      rg: '1rem',
      md: '1.33rem',
      lg: '1.77rem',
      xl: '2.369rem',
    },
    fontSizes: {
      xs: '0.563rem',
      sm: '0.75rem',
      rg: '1rem',
      md: '1.33rem',
      lg: '1.77rem',
      xl: '2.369rem',
    },
    sizes: {
      xs: '10%',
      sm: '35%',
      md: '50%',
      lg: '75%',
      xl: '100%',
    },
    borderStyles: {},
  },
});

const injectGlobalStyles = stitches.globalCss({
  '*': { boxSizing: 'border-box', fontFamily: `Comfortaa, cursive` },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: `'Comfortaa', cursive`,
    backgroundColor: '#fff7fc',
  },

  h1: { margin: 0 },
});

injectGlobalStyles();

export default stitches;






