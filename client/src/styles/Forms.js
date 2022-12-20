import stitches from '../stitches';
const { styled } = stitches;
import { Form } from 'react-router-dom';

export const Container = styled('div', {
  width: '100vw',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '@media(min-width: 1100px) and (max-width: 1600px)': {
    maxWidth: '50vw',
  },
  '@media(min-width: 700px) and (max-width: 1100px) ': {
    maxWidth: '70vw',
  },
  '@media(min-width: 1600px)': {
    maxWidth: '40vw',
  },
  background: 'white',
  borderRadius: '12px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
});
export const StyledGridForm = styled(Form, {
  padding: '30px',
  gridTemplateColumns: 'auto auto',
  display: 'grid',
  gap: '8px',
  '@breakpoint900': {
    gridTemplateColumns: 'auto',
  },
});
export const StyledForm = styled(Form, {
  padding: '30px',
});
export const Row = styled('div', {
  height: '45px',
  marginBottom: '15px',
  position: 'relative',
});
export const Title = styled('h1', {
  height: '70px',
  background:
    'linear-gradient(130deg, rgba(161,16,98,1) 30%, rgba(104,15,247,1) 70%)',
  borderRadius: '12px 12px 0 0',
  color: 'white',
  fontWeight: '600',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
});
export const InputIcon = styled('i', {
  position: 'absolute',
  zIndex: '2',
  width: '48px',
  height: '45px',
  color: 'white',
  background: '$primary',
  border: '1px solid $primary',
  borderRadius: '50px 0 0 50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
});
export const Input = styled('input', {
  height: '45px',
  width: '100%',
  paddingLeft: '60px',
  borderRadius: '50px',
  border: '1px solid $primaryShade',
  outline: 'none',
  fontSize: '14px',
  marginBottom: '15px',
  position: 'relative',
  '&:focus': {
    borderColor: '$primary',
    boxShadow: 'inset 0px 0px 2px 2px rgba(26, 188, 156, 0.25)',
  },
});
export const SubmitButton = styled('input', {
  color: 'white',
  fontSize: '24px',
  padding: '10px',
  background: '$primary',
  border: '1px solid $primary',
  margin: 'auto',
});



