import stitches from '../stitches';
import ErrorImage from '../assets/404.png';
const { styled } = stitches;

export const ErrorPageContainer = styled('div', {
  width: '100%',
  height: '100vh',
  background: `url(${ErrorImage})`,
  backgroundSize: 'cover',
});

export const ErrorContainer = styled('div', {
  minHeight: '50vh',
  minWidth: '50vw',
  borderRadius: '18px',
  backgroundColor: '$secondary',
  color: 'white',
  boxShadow: '2px 2px 8px 0 rgba(0, 0, 0, 0.3)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '@breakpoint600': {
    minHeight: '95vh',
    minWidth: '95vw',
  },
});

export const ErrorText = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

