import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import List, { Card } from '../common/List.js';
import { useParams } from 'react-router-dom';
import { ISubtopic, SubtopicForm } from './Subtopics.types';
import { getSubtopics } from '../util/api';
import { UserContext } from '../context/UserContext.js';
import { AdminContainer } from './Subtopics.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddForm, TextInput, FormFooter, Submit } from '../styled/Forms';
const url = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8085';

const Subtopics = () => {
  const { topicId } = useParams();
  const { loggedUser } = useContext(UserContext);
  const { data, error, isError, isLoading } = useQuery(['subtopics'], () =>
    getSubtopics(topicId)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubtopicForm>();
  const queryClient = useQueryClient();
  const addSubtopic = async (data: SubtopicForm) => {
    const res = await fetch(`${url}/subtopics/${topicId}`, {
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

  const { mutateAsync } = useMutation(addSubtopic, {
    onSuccess: async (newSubtopic) => {
      queryClient.setQueryData<Array<ISubtopic> | undefined>(
        ['subtopics'],
        (old) => [newSubtopic, ...(old as Array<ISubtopic>)]
      );
    },
    onError: (err) => {
      alert(`there was an error ${err}`);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const onSubmit: SubmitHandler<SubtopicForm> = async (data) =>
    await mutateAsync(data);

  if (error instanceof Error && isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      {loggedUser?.profile_role == 'user' && (
        <AdminContainer>
          <AddForm onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='name'>Título</label>
            <TextInput
              type='text'
              id='title'
              {...register('subtopic_name', { required: true, maxLength: 64 })}
              aria-invalid={errors.subtopic_name ? 'true' : 'false'}
            />
            {errors.subtopic_name?.type === 'required' && (
              <p role='alert'>Nome é obrigatório</p>
            )}

            <label htmlFor='description'>Título</label>
            <TextInput
              type='text'
              id='title'
              {...register('description', { required: true, maxLength: 64 })}
              aria-invalid={errors?.description ? 'true' : 'false'}
            />
            {errors.description?.type === 'required' && (
              <p role='alert'>Descrição é obrigatória</p>
            )}

            <FormFooter>
              <Submit type='submit'>Criar</Submit>
            </FormFooter>
          </AddForm>
        </AdminContainer>
      )}
      <List title='Subtópicos'>
        {data.map((subtopic: ISubtopic) => (
          <Card
            key={subtopic.subtopic_id}
            title={subtopic.subtopic_name}
            description={subtopic.description}
            link={`${subtopic.subtopic_id}/posts`}
          />
        ))}
      </List>
    </>
  );
};

export default Subtopics;

