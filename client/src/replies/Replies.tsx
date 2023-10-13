import React, { useState } from 'react';
import {
  RepliesContainer,
  PostContainer,
  ReplyContainer,
  ReplyAvatar,
  Dropdown,
  DropdownContent,
  AddCommentContainer,
} from './Replies.styles';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getPostById, getPostReplies } from '../util/api';
import { IReply, ReplyForm } from './Replies.types';
import { SERVER_URL } from '../util/config';
import { addReply } from '../util/api';

export default function Replies() {
  const [parentId, setParentId] = useState<string | null>(null);
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyForm>();

  const post = useQuery(['post'], async () => getPostById(postId as string), {
    refetchOnWindowFocus: false,
  });
  
  const replies = useQuery(
    ['replies'],
    async () => getPostReplies(postId as string),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate } = useMutation(addReply, {
    onSuccess: async (newReply) => {
      queryClient.setQueryData<Array<IReply> | undefined>(
        ['replies'],
        (old) => [newReply, ...(old as Array<IReply>)]
      );
    },
    onError: (err) => {
      alert(`there was an error ${err}`);
    },
  });
  // handle submit
  const onSubmit: SubmitHandler<ReplyForm> = async (data) => mutate({data, postId});

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
        <>
          <AddCommentContainer>
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
          </AddCommentContainer>

          <RepliesContainer>
            {replies.data.map((reply: IReply) => (
              <ReplyContainer key={reply.reply_id}>
                {reply.reply_id}
                <ReplyAvatar
                  src={`${SERVER_URL}/${reply.avatar}`}
                  alt='avatar'
                />
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
        </>
      )}
    </>
  );
}

