import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { SERVER_URL } from '../util/config';
import List, { ItemCard as Card } from '../common/Lists'; //ItemsList as List, ItemCard
import { getSubtopics } from '../util/api';
import { AdminContainer, RequiredAlert , AdminLabel} from '../styles/Forms';
import { AddForm, TextInput, FormFooter, Submit } from '../styles/Forms';
import { CenteredContainer } from '../styles/Lists';
import { ISubtopic, SubtopicForm } from './Subtopics.types';

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
    const res = await fetch(`${SERVER_URL}/subtopics/${topicId}`, {
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
      {loggedUser?.user_role == 'admin' && (
        <AdminContainer>
          <AddForm onSubmit={handleSubmit(onSubmit)}>
            <AdminLabel htmlFor='name'>Título</AdminLabel>
            <TextInput
              type='text'
              id='title'
              {...register('subtopic_name', { required: true, maxLength: 64 })}
              aria-invalid={errors.subtopic_name ? 'true' : 'false'}
            />
            {errors.subtopic_name?.type === 'required' && (
              <RequiredAlert role='alert'>Nome é obrigatório</RequiredAlert>
            )}

            <AdminLabel htmlFor='description'>Título</AdminLabel>
            <TextInput
              type='text'
              id='title'
              {...register('description', { required: true, maxLength: 64 })}
              aria-invalid={errors?.description ? 'true' : 'false'}
            />
            {errors.description?.type === 'required' && (
              <RequiredAlert role='alert'>Descrição é obrigatória</RequiredAlert>
            )}

            <FormFooter>
              <Submit type='submit'>Criar</Submit>
            </FormFooter>
          </AddForm>
        </AdminContainer>
      )}
      <CenteredContainer>
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
      </CenteredContainer>
    </>
  );
};

export default Subtopics;
