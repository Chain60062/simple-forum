import { AdminContainer, AdminLabel, RequiredAlert } from '../styles/Forms';
import { AddForm, TextInput, FormFooter, Submit } from '../styles/Forms';
import List, { ItemCard as Card } from '../common/Lists';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addTopic, deleteTopic, updateTopic } from '../util/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminTopicsProps, ITopic } from './Topics.interfaces';
import {
  CenteredContainer,
  ItemsCardButtons,
  StyledItemsCardButton,
} from '../styles/Lists';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

const TopicsAdmin = (props: AdminTopicsProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITopic>();
  // Add
  const addMutation = useMutation(addTopic, {
    onSuccess: async (newTopic) => {
      queryClient.setQueryData<Array<ITopic> | undefined>(['topics'], (old) => [
        newTopic,
        ...(old as Array<ITopic>),
      ]);
    },
  });
  // Update
  // const updateMutation = useMutation(updateTopic, {
  //   onSuccess: async (newTopic) => {
  //     queryClient.setQueryData<Array<ITopic> | undefined>(['topics'], (old) => [
  //       newTopic,
  //       ...(old as Array<ITopic>),
  //     ]);
  //   },
  // });
  // Delete
  const deleteMutation = useMutation(deleteTopic, {
    onSuccess: () => {
      console.log('removido');
      queryClient.invalidateQueries({
        queryKey: ['topics'],
        exact: true,
        refetchType: 'active',
      });
    },
  });

  const onSubmit: SubmitHandler<ITopic> = async (data) =>
    await addMutation.mutate(data);

  const handleDelete = async (topicId: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Mutate the query to remove the item from the cache
      await deleteMutation.mutate(topicId);
    }
  };

  return (
    <>
      <AdminContainer>
        <AddForm onSubmit={handleSubmit(onSubmit)}>
          <AdminLabel htmlFor='name'>Nome do Tópico</AdminLabel>
          <TextInput
            type='text'
            id='title'
            {...register('topic_name', { required: true, maxLength: 64 })}
            aria-invalid={errors.topic_name ? 'true' : 'false'}
          />
          {errors.topic_name?.type === 'required' && (
            <RequiredAlert role='alert'>Nome é obrigatório</RequiredAlert>
          )}

          <AdminLabel htmlFor='description'>Descrição</AdminLabel>
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
      {/* Topics list */}
      <CenteredContainer>
        <List title='Tópicos'>
          {props.topics.map((topic: ITopic) => (
            <Card
              key={topic.topic_id}
              title={topic.topic_name}
              description={topic.description}
              link={`${topic.topic_id}/subtopics`}
            >
              <ItemsCardButtons>
                <StyledItemsCardButton>
                  <HiOutlinePencilAlt size={20} />
                </StyledItemsCardButton>

                <StyledItemsCardButton
                  onClick={() => handleDelete(topic.topic_id)}
                >
                  <HiOutlineTrash size={20} />
                </StyledItemsCardButton>
              </ItemsCardButtons>
            </Card>
          ))}
        </List>
      </CenteredContainer>
      ;
    </>
  );
};

export default TopicsAdmin;

