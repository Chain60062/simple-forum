import { createStitches } from '@stitches/react';

const stitches = createStitches({
  media: {
    breakpoint600: '(max-width: 600px)',
    breakpoint900: '(max-width: 900px)',
  },
  theme: {
    colors: {
      primary: '#a11062',
      primaryFade: '#BD5791',
      secondary: '#680ff7',
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
  'html, body': {
    margin: 0,
    height: '100%',
    padding: 0,
    fontFamily: `'Comfortaa', cursive`,
  },

  h1: { margin: 0 },
});

injectGlobalStyles();

export default stitches;



