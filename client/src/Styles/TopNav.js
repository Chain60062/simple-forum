import stitches from '../stitches';
const { styled } = stitches;

export const TopNavBody = styled('div', {
  overflow: 'hidden',
  backgroundColor: '#333',
});
export const TopNavLink = styled('a', {
  display: 'block',
  float: 'left',
  color: '#f2f2f2',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none',
  fontSize: '18px',
  '&:not(:first-child)': {
    '@breakpointMax600': {
      display: 'none',
    },
  },
  variants: {
    collapsed: {
      true: {
        '@breakpointMax900': {
          float: 'none',
          display: 'block !important',
          textAlign: 'left',
        },
      },
    },
  },
  '&:hover': {
    backgroundColor: '#ddd',
    color: 'black',
  },
});

export const TopNavIcon = styled('a', {
  color: 'white',
  display: 'none',
  '@breakpointMax900': {
    float: 'right',
    display: 'block',
  },
  variants: {
    collapsed: {
      true: {
        '@breakpointMax900': {
          position: 'absolute',
          right: '0',
          top: '0',
        },
      },
    },
  },
});


