import {
  RepliesContainer,
  PostContainer,
  ReplyContainer,
  ReplyAvatar,
  Dropdown,
  DropdownContent,
  AddCommentContainer,
  ReplyComment,
} from './Replies.styles';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getPostById, getPostReplies } from '../api/posts';
import { IReply, ReplyForm } from './Replies.interfaces';
import { SERVER_URL } from '../util/config';
import { addReply, editReply } from '../api/replies';
import { AddForm, FormFooter, Submit, TextInput } from '../styles/Forms';
import { MainLoader } from '../styles/Loaders';
import { FocusEvent, KeyboardEvent, useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';

export default function Replies() {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { loggedUser } = useContext(UserContext);
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

  const addMutation = useMutation(addReply, {
    onSuccess: async (newReply) => {
      queryClient.setQueryData<Array<IReply> | undefined>(
        ['replies'],
        (old) => [newReply, ...(old as Array<IReply>)]
      );
    },
    onError: (err) => {
      alert(`Houve um erro: ${err}`);
    },
  });
  const editMutation = useMutation(editReply, {
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      alert(`Houve um erro: ${err}`);
    },
  });
  // handle submit
  const onSubmit: SubmitHandler<ReplyForm> = async (data) =>
    addMutation.mutate({ data, postId });

  const handleReplyEditEnterPress = (
    e: KeyboardEvent<HTMLSpanElement>,
    reply_id: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.currentTarget.textContent != null && reply_id != null) {
        editMutation.mutate({
          data: { message: e.currentTarget.textContent },
          replyId: reply_id,
        });
      }
    }
  };

  const handleReplyEditOnFocusOut = (
    e: FocusEvent<HTMLSpanElement>,
    reply_id: number
  ) => {
    e.preventDefault();
    // if (e.currentTarget.textContent != null && reply_id != null) {
    //   editMutation.mutate({
    //     data: { message: e.currentTarget.textContent },
    //     replyId: reply_id,
    //   });
    // }
  };

  if (post.error instanceof Error && post.isError) {
    return <span>Error: {post.error.message}</span>;
  }

  return (
    <>
      {post.isLoading ? (
        <MainLoader />
      ) : (
        <PostContainer>
          <h1>{post.data.title}</h1>
          <h3>{post.data.message}</h3>
        </PostContainer>
      )}
      {replies.isLoading ? (
        <MainLoader />
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
                <ReplyAvatar
                  src={`${SERVER_URL}/${reply.avatar}`}
                  alt='avatar'
                />

                <p>
                  {reply.user_name}:
                  <ReplyComment
                    contentEditable={
                      loggedUser?.user_id == reply.user_id ? 'true' : 'false'
                    }
                    suppressContentEditableWarning={true} //removes react warning about manual state management
                    onKeyDown={(e) =>
                      handleReplyEditEnterPress(e, reply.reply_id)
                    }
                    onBlur={(e) => handleReplyEditOnFocusOut(e, reply.reply_id)}
                  >
                    {reply.message}
                  </ReplyComment>
                </p>
                <Dropdown>
                  <HiOutlineDotsVertical />
                  <DropdownContent className='dropdown-content'>
                    {/* <a onClick={() => setParentId(reply.replyId)}>Reply</a> */}
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

