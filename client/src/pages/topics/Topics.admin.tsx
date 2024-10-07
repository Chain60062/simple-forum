import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { addTopic, deleteTopic } from '../../api/topics'
import SubtopicList, { TopicCard as SubtopicCard } from '../../components/TopicList/TopicList'
import { AdminContainer, AdminLabel, RequiredAlert } from '../../styles/Forms'
import { AddForm, FormFooter, Submit, TextInput } from '../../styles/Forms'
import {
	CenteredContainer,
	ItemsCardButtons,
	StyledItemsCardButton,
} from '../../components/TopicList/TopicList.styles'
import type { AdminTopicsProps, Topic } from './Topics.interfaces'

const TopicsAdmin = (props: AdminTopicsProps) => {
	const queryClient = useQueryClient()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Topic>()
	// Add
	const addMutation = useMutation({
		mutationFn: addTopic,
		onSuccess: async (newTopic) => {
			queryClient.setQueryData<Array<Topic> | undefined>(['topics'], (old) => [
				newTopic,
				...(old as Array<Topic>),
			])
		},
	})
	// Update
	// const updateMutation = useMutation(updateTopic, {
	//   onSuccess: async (newTopic) => {
	//     queryClient.setQueryData<Array<Topic> | undefined>(['topics'], (old) => [
	//       newTopic,
	//       ...(old as Array<Topic>),
	//     ]);
	//   },
	// });
	// Delete
	const deleteMutation = useMutation({
		mutationFn: deleteTopic,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['topics'],
				exact: true,
				refetchType: 'active',
			})
		},
	})

	const onSubmit: SubmitHandler<Topic> = async (data) =>
		await addMutation.mutate(data)

	const handleDelete = async (topicId: number) => {
		if (window.confirm('Tem certeza de que quer remover este item?')) {
			await deleteMutation.mutate(topicId)
		}
	}

	return (
		<>
			<AdminContainer>
				<AddForm onSubmit={handleSubmit(onSubmit)}>
					<AdminLabel htmlFor="topic_name">Nome do Tópico</AdminLabel>
					<TextInput
						type="text"
						id="topic_name"
						{...register('topic_name', { required: true, maxLength: 64 })}
						aria-invalid={errors.topic_name ? 'true' : 'false'}
					/>
					{errors.topic_name?.type === 'required' && (
						<RequiredAlert role="alert">Nome é obrigatório</RequiredAlert>
					)}

					<AdminLabel htmlFor="description">Descrição</AdminLabel>
					<TextInput
						type="text"
						id="description"
						{...register('description', { required: true, maxLength: 64 })}
						aria-invalid={errors?.description ? 'true' : 'false'}
					/>
					{errors.description?.type === 'required' && (
						<RequiredAlert role="alert">Descrição é obrigatória</RequiredAlert>
					)}

					<FormFooter>
						<Submit type="submit">Criar</Submit>
					</FormFooter>
				</AddForm>
			</AdminContainer>
			{/* Topics list */}
			<CenteredContainer>
				<SubtopicList title="Tópicos">
					{props.topics.map((topic: Topic) => (
						<SubtopicCard
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
						</SubtopicCard>
					))}
				</SubtopicList>
			</CenteredContainer>
		</>
	)
}

export default TopicsAdmin
