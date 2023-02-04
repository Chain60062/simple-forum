import { createStitches } from '@stitches/react';

const stitches = createStitches({
  media: {
    breakpoint600: '(max-width: 600px)',
    breakpoint900: '(max-width: 900px)',
    breakpoint1100: '(max-width: 1100px)',
    breakpointMin600: '(min-width: 600px)',
    breakpointMin900: '(min-width: 900px)',
    breakpointMin1200: '(min-width: 1200px)',
  },
  theme: {
    colors: {
      secondary: '#59e3b7',
      secondaryShade: '#D8D8E5',
      secondaryBright: '#782bf3',
      primary: '#59e3b7',
      primaryShade: '#0F0A35',
      primaryBright: '#c1b8df',
      background: '#ffffff',
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
    fontFamily: `'Work Sans', sans-serif;`,
    backgroundColor: '$background',
  },
  'html, body': {
    height: '100%',
  },
  h1: { margin: 0 },
});

injectGlobalStyles();

export default stitches;

