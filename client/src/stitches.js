import { createStitches } from '@stitches/react';

const stitches = createStitches({
  media: {
    breakpointMax600: '(max-width: 600px)',
    breakpointMax900: '(max-width: 900px)',
  },
  theme: {
    colors: {},
    space: {
      xxs: '0.422rem',
      xs: '0.563rem',
      sm: '0.75rem',
      rg: '1rem',
      md: '1.33rem',
      lg: '1.77rem',
      xl: '2.369rem',
      xxl: '3.157rem',
    },
    fontSizes: {
      xxs: '0.422rem',
      xs: '0.563rem',
      sm: '0.75rem',
      rg: '1rem',
      md: '1.33rem',
      lg: '1.77rem',
      xl: '2.369rem',
      xxl: '3.157rem',
    },
  },
});

const injectGlobalStyles = stitches.globalCss({
  '*': { boxSizing: 'border-box', fontFamily: `Comfortaa, cursive` },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: `'Comfortaa', cursive`,
    // backgroundColor: '#1a1a1c',
  },
  h1: { margin: 0 },
});

injectGlobalStyles();

export default stitches;


