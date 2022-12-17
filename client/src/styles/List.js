import stitches from '../stitches';
const { styled } = stitches;

export const ListInnerContainer = styled('div', {
  minHeight: '85vh',
  minWidth: '70vw',
  height: '80%',
  marginTop: '$lg',
  borderRadius: '18px',
  background: 'linear-gradient(150deg, rgba(161,16,98,1) 30%, rgba(104,15,247,1) 74%)',
  boxShadow: '2px 2px 8px 0 rgba(0, 0, 0, 0.3)',
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
  margin: '.5rem 2rem .5rem 2rem',
  backgroundColor: 'white',
  padding: '$xs',
  transition:
    'background-color ease-out 200ms, color ease-out 200ms',
  '&:hover': {
    backgroundColor: '$primaryFade',
    color: 'white',
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

