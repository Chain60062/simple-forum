import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const MainContent = styled.div`
  grid-area: posts;
  overflow-y: auto;
`;

export const SidebarBody = styled.nav`
  overflow-y: auto;
  background-color: #223697;
  margin-top: 0;
  grid-area: sidebar;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const SidebarLink = styled(Link)`
  background-color: white;
  display: block;
  text-align: center;
  padding: 10px;
  margin: 8px;
  border-radius: 12px;
`;

export const PostCard = styled.section`
  display: grid;
  justify-content: center;
  flex-wrap: wrap;
  color: black;
  background-color: white;
  margin: 12px auto 12px auto;
  width: 50%;
  overflow: hidden;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);

  @media (max-width: 1450px) {
    width: 60%;
  }
  @media (max-width: 1000px) {
    width: 95%;
  }
`;

export const PostFooter = styled.div`
  float: right;
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'topnav'
    'posts';

  @media (min-width: 900px) {
    grid-template-areas: 'topnav topnav' 'sidebar posts';
    grid-template-columns: 0.2fr 1fr;
    grid-template-rows: auto 1fr;
    grid-auto-flow: row;
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  height: 100px;
  width: 100%;
  padding: 8px;
  margin: 8px;
  border-radius: 12px;
`;

export const FileInput = styled.input`
  display: block;
  margin-top: 8px;
`;

export const AddPostContainer = styled.div`
  position: relative;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  width: 50%;
  margin: 12px auto;
  border-radius: 12px;
  background-color: #1d3869;
`;

