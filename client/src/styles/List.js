import stitches from '../stitches';
const { styled } = stitches;

export const ListInnerContainer = styled('div', {
  backgroundColor: '$primary', 
  minHeight: '80vh',
  minWidth: '80vw',
  height: '80%',
  marginTop: '$lg',
  borderRadius: '18px',
  boxShadow: '2px 2px 8px 0 rgba(0, 0, 0, 0.3)',
  '@breakpoint600': {
    minWidth: '90vw',
  },
});

export const ListOuterContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ListCard = styled('div', {
  minHeight: '64px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
  borderRadius: '12px',
  margin: '.8rem 2rem .8rem 2rem',
  color: 'white',
  backgroundColor: '$primaryShade',
  padding: '$xs',
  transition: 'background-color ease-out 200ms, color ease-out 200ms',
  '&:hover': {
    backgroundColor: '$primaryBright',
  },
  '&:first-child': {
    marginTop: '2rem',
  },
});

export const ListCardTitle = styled('div', {
  fontSize: '24px',
});
export const ListCardDescription = styled('div', {
  fontSize: '12px',
  marginTop: '$xs',
});
export const Title = styled('h1', {
  color: 'white',
  textAlign: 'center',
  margin: '12px',
  fontFamily: `'Quicksand', sans-serif`,
  fontSize: '38px',
});


