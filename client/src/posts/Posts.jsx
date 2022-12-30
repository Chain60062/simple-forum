import React from 'react';
import TopNav from '../common/TopNav';
import mock2 from '../assets/mock2.jpg';
import mock from '../assets/mock.jpg';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import stitches from '../stitches';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const { styled } = stitches;
const url = import.meta.REACT_APP_SERVER_URL || 'http://localhost:8085';
import {
  MainContent,
  Container,
  PostCard,
  SidebarBody,
  SidebarLink,
  SidebarList,
  CreatePostForm,
  FileInput,
  FormFooter,
  Submit,
  TextArea,
  TitleInput,
} from '../styles/Posts';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const { subtopicId } = useParams();
  const { data, error, isLoading } = useSWR(
    `${url}/posts/subtopic/${subtopicId}`,
    fetcher
  );

  if (error) return <h1>Ops! Algo deu errado</h1>;
  if (isLoading) return <h1>Carregando...</h1>;

  return (
    <Container>
      <TopNav />
      <Sidebar />
      <MainContent>
        <CreatePostForm>
          <label htmlFor='postTitle'>Título</label>
          <TitleInput type='text' id='postTitle'></TitleInput>
          <label htmlFor='postMessage'>Mensagem</label>
          <TextArea id='postMessage'></TextArea>
          <FileInput type='file' multiple></FileInput>
          <FormFooter>
            <Submit>Postar</Submit>
          </FormFooter>
        </CreatePostForm>
        {data.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            message={post.message}
            files={post.files}
          />
        ))}
      </MainContent>
    </Container>
  );
};
const Post = (props) => {
  return (
    <PostCard>
      <h2>{props.title}</h2>
      <SlideshowContainer>
        {/* {props.files.map((image, index) => ( */}
          <div className='mySlide'>
            <Img src={mock}></Img>
            <ControlButton
              className='prev'
              onClick={() => plusSlides(-1)}
            ></ControlButton>
            <ControlButton
              className='next'
              onClick={() => plusSlides(1)}
            ></ControlButton>
            <div style='text-align: center'>
              <Dot className='dot' onClick={()=>currentSlide(1)}></Dot>
              <Dot className='dot' onClick={()=>currentSlide(2)}></Dot>
            </div>
          </div>
        {/* ))} */}
      </SlideshowContainer>
      <p>{props.message}</p>
    </PostCard>
  );
};
const ControlButton = styled('div', {
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  width: '50px',
  height: '50px',
  padding: '16px',
  marginTop: '-22px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px',
  userSelect: 'none',
  borderRadius: '50%',
});

const Dot = styled('span', {
  cursor: 'pointer',
  height: '15px',
  width: '15px',
  margin: '0 2px',
  backgroundColor: '#bbb',
  borderRadius: '50%',
  display: 'inline-block',
  transition: 'background-color 0.6s ease',
  '&:hover': {
    backgroundColor: '#717171',
  },
});
const SlideshowContainer = styled('div', {
  width: '50%',
  marginLeft: 'auto',
  marginRight: 'auto',
});
const Img = styled('img', {
  width: '100%',
  objectFit: 'scale-down',
  objectPosition: 'center',
});
Post.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  files: PropTypes.array,
};
const Sidebar = () => {
  return (
    <SidebarBody>
      <SidebarList>
        <SidebarLink>Link</SidebarLink>
        <SidebarLink>Link</SidebarLink>
        <SidebarLink>Link</SidebarLink>
        <SidebarLink>Link</SidebarLink>
      </SidebarList>
    </SidebarBody>
  );
};

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('dot');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
export default Posts;


