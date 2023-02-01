import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import List, { Card } from '../common/List.js';
import { ITopic } from './Topics.types';
import { getTopics } from '../util/api';
import { UserContext } from '../context/UserContext.js';
import { AdminContainer } from './Topics.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddForm, TextInput, FormFooter, Submit } from '../styled/Forms';
const url = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8085';

const Topics = () => {
  const { loggedUser } = useContext(UserContext);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITopic>();
  const queryClient = useQueryClient();
  const addSubtopic = async (data: ITopic) => {
    const res = await fetch(`${url}/topics`, {
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
    onSuccess: async (newTopic) => {
      queryClient.setQueryData<Array<ITopic> | undefined>(['topics'], (old) => [
        newTopic,
        ...(old as Array<ITopic>),
      ]);
    },
    onError: (err) => {
      alert(`there was an error ${err}`);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const onSubmit: SubmitHandler<ITopic> = async (data) =>
    await mutateAsync(data);

  if (error instanceof Error && isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      {loggedUser?.profile_role == 'user' && (
        <AdminContainer>
          <AddForm onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='name'>Nome do Tópico</label>
            <TextInput
              type='text'
              id='title'
              {...register('topic_name', { required: true, maxLength: 64 })}
              aria-invalid={errors.topic_name ? 'true' : 'false'}
            />
            {errors.topic_name?.type === 'required' && (
              <p role='alert'>Nome é obrigatório</p>
            )}

            <label htmlFor='description'>Descrição</label>
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
      <List title='Tópicos'>
        {data.map((topic: ITopic) => (
          <Card
            key={topic.topic_id}
            title={topic.topic_name}
            description={topic.description}
            link={`${topic.topic_id}/subtopics`}
          />
        ))}
      </List>
    </>
  );
};

export default Topics;

