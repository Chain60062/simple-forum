import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import TopNav from '../common/TopNav.jsx';
import mock from '../assets/mock.jpg';
import stitches from '../stitches';
const { styled } = stitches;
const url = import.meta.env.REACT_APP_SERVER_URL || 'http://localhost:8085';
import {
  MainContent,
  Container,
  PostCard,
  SidebarBody,
  SidebarLink,
  SidebarList,
  FileInput,
  TextArea,
  AddPostContainer,
  PostFooter,
} from './Posts.styles';
import { AddForm, TextInput, FormFooter, Submit } from '../styled/Forms';
import { getPosts } from '../util/api';
import { PostProps, IPost } from './Posts.types';
import { StyledLink } from '../styled/Router';
const Posts = () => {
  const { subtopicId } = useParams();
  const { loggedUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const addPost = async (data: IPost) => {
    const res = await fetch(`${url}/posts/${subtopicId}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const { isError, isLoading, data, error } = useQuery(
    ['posts'],
    () => getPosts(subtopicId!),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutateAsync } = useMutation(addPost, {
    onSuccess: async (newPost) => {
      queryClient.setQueryData<Array<IPost> | undefined>(['posts'], (old) => [
        newPost,
        ...(old as Array<IPost>),
      ]);
    },
    onError: (err) => {
      alert(`there was an error ${err}`);
    },
  });

  const onSubmit = async (data: any) => await mutateAsync(data);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error instanceof Error && isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <Container>
      <TopNav />
      <Sidebar />
      <MainContent>
        {loggedUser && (
          <AddPostContainer>
            <AddForm onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor='postTitle'>Título</label>
              <TextInput
                type='text'
                id='title'
                {...register('title', { required: true, maxLength: 64 })}
                aria-invalid={errors.title ? 'true' : 'false'}
              />
              {errors.title?.type === 'required' && (
                <p role='alert'>First name is required</p>
              )}
              <label htmlFor='postMessage'>Mensagem</label>

              <TextArea
                id='message'
                {...register('message', { required: true, maxLength: 2000 })}
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message?.type === 'required' && (
                <p role='alert'>First name is required</p>
              )}
              <FileInput type='file' multiple></FileInput>

              <FormFooter>
                <Submit type='submit'>Postar</Submit>
              </FormFooter>
            </AddForm>
          </AddPostContainer>
        )}
        {data.map((post: IPost) => (
          <Post
            key={post.post_id}
            title={post.title}
            message={post.message}
            files={post.files}
            link={`${post.post_id}`}
          />
        ))}
      </MainContent>
    </Container>
  );
};

const Post = (props: PostProps) => {
  return (
    <PostCard>
      <StyledLink to={props.link}>
        <h2>{props.title}</h2>
        <SlideshowContainer>
          {props.files?.map((image, index) => (
            <Img src={mock} key={index}></Img>
          ))}
        </SlideshowContainer>
        <p>{props.message}</p>
      </StyledLink>
      <PostFooter>
        <HiOutlinePencilAlt size={2}/>
        <HiTrash size={2}/>
      </PostFooter>
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

const Sidebar = () => {
  return (
    <SidebarBody>
      <SidebarList>
        <SidebarLink to='sneed'>Link</SidebarLink>
        <SidebarLink to='sneed'>Link</SidebarLink>
        <SidebarLink to='sneed'>Link</SidebarLink>
        <SidebarLink to='sneed'>Link</SidebarLink>
      </SidebarList>
    </SidebarBody>
  );
};
export default Posts;


