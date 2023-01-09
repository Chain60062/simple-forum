import React, { useState, useEffect, useCallback } from 'react';
import TopNav from '../common/TopNav';
import mock from '../assets/mock.jpg';
import PropTypes from 'prop-types';
import stitches from '../stitches';
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { subtopicId } = useParams();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await fetch(`${url}/posts/${subtopicId}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setTitle('');
            setMessage('');
            setResponseMessage('User created successfully');
            console.log('CRIADO COM SUCESSO');
          } else {
            setResponseMessage('Some error occured');
            console.log('CRIADO COM ERRO');
          }
        });
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(() => console.log('sneed'), 30_000);
    return () => clearInterval(interval);
  }, []);

  async function fetchPosts() {
    await fetch(`${url}/posts/subtopic/${subtopicId}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setLoading(false);
          setPosts(data);
        },
        (err) => {
          setLoading(true);
          setError(err);
        }
      );
  }
  return (
    <Container>
      <TopNav />
      <Sidebar />
      <MainContent>
        <CreatePostForm onSubmit={handleSubmit}>
          <label htmlFor='postTitle'>Título</label>
          <TitleInput
            type='text'
            id='postTitle'
            value={title}
            onChange={useCallback((e) => setTitle(e.target.value), [setTitle])}
          ></TitleInput>
          <label htmlFor='postMessage'>Mensagem</label>

          <TextArea
            id='postMessage'
            value={message}
            onChange={useCallback(
              (e) => setMessage(e.target.value),
              [setMessage]
            )}
          ></TextArea>

          <FileInput type='file' multiple></FileInput>

          <FormFooter>
            <Submit type='submit'>Postar</Submit>
          </FormFooter>
        </CreatePostForm>
        {!loading &&
          posts.map((post) => (
            <Post
              key={post.post_id}
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
        {props.files.map((image, index) => (
          <Img src={mock} key={index}></Img>
        ))}
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
export default Posts;

