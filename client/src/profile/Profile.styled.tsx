import stiches from '../stitches';
const { styled } = stiches;

export const Container = styled('div', {
  width: '80%',
  height: '400px',
  margin: '12px auto',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
});
export const Options = styled('div', {
  width: '80%',
  height: '300px',
  margin: '12px auto',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
});
export const Avatar = styled('img', {
  borderRadius: '50%',
  maxHeight: '40%',
  maxWidth: '40%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '$lg',
});
export const Username = styled('h1', { textAlign: 'center' });

