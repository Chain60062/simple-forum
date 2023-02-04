import stiches from '../stitches';
const { styled } = stiches;

export const RepliesContainer = styled('div', {
  position: 'relative',
  width: '80%',
  margin: '12px auto',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
  backgroundColor: '$primary',
});

export const PostContainer = styled('div', {
  position: 'relative',
  width: '80%',
  height: '30vh',
  margin: '12px auto',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
  backgroundColor: '$primary',
});
export const AddCommentContainer = styled('div', {
  position: 'relative',
  width: '80%',
  height: '20vh',
  margin: '12px auto',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
  backgroundColor: '$primary',
});

export const ReplyContainer = styled('div', {
  display: 'flex',
  width: '80%',
  height: '64px',
  margin: '12px auto',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
  backgroundColor: '$primary',
  alignItems: 'center',
});
export const ReplyAvatar = styled('img', {
  height: '50px',
  width: '50px',
});

export const DropdownContent = styled('div', {
  display: 'none',
  position: 'absolute',
  backgroundColor: '#f9f9f9',
  minWidth: '140px',
  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  padding: '8px 12px',
  zIndex: 1,
});

export const Dropdown = styled('div', {
  position: 'relative',
  display: 'inline-block',
  marginLeft: 'auto',
  '&:hover .dropdown-content': {
    display: 'block',
  },
});

