import React, { useContext } from 'react';
import List, { ItemCard as Card } from '../common/Lists'; //ItemsList as List, ItemCard
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { getTopics, addTopic } from '../util/api';
import { ITopic } from './Topics.types';
import { CenteredContainer } from '../styles/Lists';
import { AdminContainer } from './Topics.styles';
import { AddForm, TextInput, FormFooter, Submit } from '../styles/Forms';

const Topics = () => {
  const { loggedUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITopic>();

  const { mutateAsync } = useMutation(addTopic, {
    onSuccess: async (newTopic) => {
      queryClient.setQueryData<Array<ITopic> | undefined>(['topics'], (old) => [
        newTopic,
        ...(old as Array<ITopic>),
      ]);
    },
    onError: (err) => {
      alert(`Houve um erro: ${err}`);
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
      {loggedUser?.profile_role == 'admin' && (
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
      {/* Topics List */}
      <CenteredContainer>
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
      </CenteredContainer>
    </>
  );
};

export default Topics;

