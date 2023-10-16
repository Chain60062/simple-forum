import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import TopNav from '../common/TopNav.jsx';
import { addPost } from '../util/api';
import {
  MainContent,
  Container,
  PostCard,
  SidebarBody,
  SidebarLink,
  FileInput,
  TextArea,
  AddPostContainer,
  PostFooter,
} from './Posts.styles';
import { getPosts } from '../util/api';
import { PostProps, IPost, PostFormData } from './Posts.types';
import { AddForm, FormFooter, Submit, TextInput } from '../styles/Forms.js';
import Carousel from './Carousel.js';

const Posts = () => {
  const { subtopicId } = useParams();
  const { loggedUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>();

  const { mutate } = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      alert(`there was an error ${err}`);
    },
  });

  const { isLoading, data, isError, error } = useQuery(['posts'], () =>
    getPosts(subtopicId!)
  );

  const onSubmit = async (post: PostFormData) => {
    if (subtopicId) {
      mutate({ post, subtopicId: Number(subtopicId) });
    } else {
      throw new Response('Erro interno', { status: 500 });
    }
  };

  if (isLoading) {
    return <span>Carregando...</span>;
  }

  if (error instanceof Error && isError) {
    return <span>Erro: {error.message}</span>;
  }

  return (
    <Container>
      <TopNav />
      <Sidebar />
      <MainContent>
        {loggedUser && (
          <AddPostContainer>
            <AddForm onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor='title'>Título</label>
              <TextInput
                type='text'
                id='title'
                {...register('title', { required: true, maxLength: 64 })}
                aria-invalid={errors.title ? 'true' : 'false'}
              />
              {errors.title?.type === 'required' && (
                <p role='alert'>First name is required</p>
              )}
              <label htmlFor='message'>Mensagem</label>

              <TextArea
                id='message'
                {...register('message', { required: true, maxLength: 2000 })}
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message?.type === 'required' && (
                <p role='alert'>First name is required</p>
              )}
              <FileInput
                type='file'
                multiple
                {...register('files', { required: false, max: 3 })}
              ></FileInput>
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
// A single post
const Post = (props: PostProps) => {
  return (
    <PostCard>
      <h2>{props.title}</h2>
      <Carousel images={props.files} link={props.link} />
      <p>{props.message}</p>
      <PostFooter>
        <HiOutlinePencilAlt size={2} />
        <HiTrash size={2} />
      </PostFooter>
    </PostCard>
  );
};

const Sidebar = () => {
  return (
    <SidebarBody>
      <div>
        <SidebarLink to='nowhere'>Link</SidebarLink>
        <SidebarLink to='nowhere'>Link</SidebarLink>
        <SidebarLink to='nowhere'>Link</SidebarLink>
        <SidebarLink to='nowhere'>Link</SidebarLink>
      </div>
    </SidebarBody>
  );
};
export default Posts;

