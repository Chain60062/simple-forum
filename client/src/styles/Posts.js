import stitches from '../stitches';
import { Link, Form } from 'react-router-dom';
const { styled } = stitches;

export const MainContent = styled('div', {
  gridArea: 'posts',
  overflowY: 'auto',
});
export const SidebarBody = styled('nav', {
  overflowY: 'auto',
  backgroundColor: '$primary',
  marginTop: '0',
  gridArea: 'sidebar',
  '@breakpoint900': {
    display: 'none',
  },
});
export const SidebarList = styled('div', {});
export const SidebarLink = styled(Link, {
  backgroundColor: '$primaryShade',
  display: 'block',
  textAlign: 'center',
  padding: '10px',
  margin: '8px',
  borderRadius: '12px',
  '&:hover': {},
});
export const PostCard = styled('div', {
  color: '$secondaryShade',
  margin: '12px auto 12px auto',
  width: '80%',
  padding: '12px',
  borderRadius: '12px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
});
export const Container = styled('div', {
  height: '100vh',
  width: '100vw',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateAreas: `
  "topnav"
  "posts"
  `,
  '@breakpointMin900': {
    gridTemplateColumns: '0.6fr 1.4fr',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `"topnav topnav" "sidebar posts"`,
    gridAutoFlow: 'row',
  },
});
export const CreatePostForm = styled(Form, {
  width: '80%',
  margin: '12px auto',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  boxShadow: '2px 2px 6px 0 rgba(0, 0, 0, 0.3)',
  '&:focus': {
    borderColor: '$primary',
    boxShadow: 'inset 0px 0px 2px 2px rgba(26, 188, 156, 0.25)',
  },
});
export const TitleInput = styled('input', {
  display: 'block',
  padding: '8px',
  width: '100%',
  borderRadius: '12px',
});
export const TextArea = styled('textarea', {
  display: 'block',
  resize: 'none',
  height: '100px',
  width: '100%',
  padding: '8px',
  borderRadius: '12px',
});
export const FileInput = styled('input', {
  display: 'block',
  marginTop: '8px',
});
export const FormFooter = styled('div', {
  width: '100%',
  height: '36px',
  marginTop: '12px',
});
export const Submit = styled('button', {
  display: 'block',
  padding: '12px 16px 12px 16px',
  backgroundColor: '$secondary',
  color: 'White',
  borderRadius: '12px',
  border: 'none',
  outline: 'none',
});