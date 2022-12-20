import stitches from '../stitches';
import { Link } from 'react-router-dom';
const { styled } = stitches;

export const TopNavBody = styled('div', {
  overflow: 'hidden',
  backgroundColor: '$secondary',
});
export const NavLink = styled(Link, {
  display: 'block',
  float: 'left',
  color: 'white',
  borderRadius: '12px',
  margin: '8px 2px 8px 2px',
  textAlign: 'center',
  padding: '8px 12px',
  textDecoration: 'none',
  fontSize: '18px',
  '&:not(:first-child)': {
    '@breakpoint900': {
      display: 'none',
    },
  },
  '&:hover': {
    backgroundColor: '$secondaryShade',
    color: 'white',
  },
  variants: {
    collapsed: {
      true: {
        '@breakpoint900': {
          float: 'none !important',
          display: 'block !important',
          textAlign: 'left',
        },
      },
    },
  },
});

export const TopNavIcon = styled(Link, {
  color: 'white',
  display: 'none',
  '@breakpoint900': {
    float: 'right',
    display: 'block',
  },
  variants: {
    collapsed: {
      true: {
        '@breakpoint900': {
          position: 'absolute',
          right: '0',
          top: '0',
        },
      },
    },
  },
});

