import React, { useState } from 'react';
import {
  RepliesContainer,
  PostContainer,
  ReplyContainer,
  ReplyAvatar,
  Dropdown,
  DropdownContent,
} from './Replies.styled';
import { AddForm, FormFooter, Submit, TextInput } from '../styled/Forms';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getPostById, getPostReplies } from '../util/api';
import { IReply, ReplyForm } from './Replies.types';
const url = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8085';

export default function Replies() {
  const addReply = async (data: ReplyForm) => {
    const res = await fetch(`${url}/subtopics/${postId}/${parentId}`, {
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
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const [parentId, setParentId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyForm>();

  const post = useQuery(['post'], () => getPostById(postId!), {
    refetchOnWindowFocus: false,
  });
  const replies = useQuery(['replies'], () => getPostReplies(postId!), {
    refetchOnWindowFocus: false,
  });

  const { mutateAsync } = useMutation(addReply, {
    onSuccess: async (newSubtopic) => {
      queryClient.setQueryData<Array<IReply> | undefined>(
        ['subtopics'],
        (old) => [newSubtopic, ...(old as Array<IReply>)]
      );
    },
    onError: (err) => {
      alert(`there was an error ${err}`);
    },
  });
  const onSubmit: SubmitHandler<ReplyForm> = async (data) =>
    await mutateAsync(data);

  if (post.error instanceof Error && post.isError) {
    return <span>Error: {post.error.message}</span>;
  }
  return (
    <>
      {post.isLoading ? (
        <span>Loading Post...</span>
      ) : (
        <PostContainer>
          <h1>{post.data.title}</h1>
          <h3>{post.data.message}</h3>
        </PostContainer>
      )}
      {replies.isLoading ? (
        <span>Loading replies...</span>
      ) : (
        <RepliesContainer>
          <AddForm onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='name'>Comentário</label>
            <TextInput
              type='text'
              id='title'
              {...register('message', {
                required: true,
                maxLength: 64,
              })}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message?.type === 'required' && (
              <p role='alert'>Mensagem é obrigatória</p>
            )}
            <FormFooter>
              <Submit type='submit'>Comentar</Submit>
            </FormFooter>
          </AddForm>

          {replies.data.map((reply: IReply) => (
            <ReplyContainer key={reply.reply_id}>
              <ReplyAvatar src={`${url}/${reply.avatar}`} alt='avatar' />
              <p>
                {reply.nickname} Comentou: {reply.message}
              </p>
              <Dropdown>
                <HiOutlineDotsVertical />
                <DropdownContent className='dropdown-content'>
                  <a onClick={() => setParentId(reply.reply_id)}>Reply</a>
                </DropdownContent>
              </Dropdown>
            </ReplyContainer>
          ))}
        </RepliesContainer>
      )}
    </>
  );
}

