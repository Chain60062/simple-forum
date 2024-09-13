import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { addSubtopic, deleteSubtopic } from '../../api/subtopics'
import List, { ItemCard as Card } from '../../components/Lists'
import { AdminContainer, AdminLabel, RequiredAlert } from '../../styles/Forms'
import { AddForm, FormFooter, Submit, TextInput } from '../../styles/Forms'
import {
	CenteredContainer,
	ItemsCardButtons,
	StyledItemsCardButton,
} from '../../styles/Lists'
import type {
	AdminSubtopicsProps,
	ISubtopic,
	SubtopicForm,
} from './Subtopics.interfaces'

const SubtopicsAdmin = (props: AdminSubtopicsProps) => {
	const queryClient = useQueryClient()
	const { topicId } = useParams()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISubtopic>()
	// Add
	const addMutation = useMutation({
		mutationFn: addSubtopic,
		onSuccess: async (newTopic) => {
			queryClient.setQueryData<Array<ISubtopic> | undefined>(
				['subtopics'],
				(old) => [newTopic, ...(old as Array<ISubtopic>)],
			)
		},
	})
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
	const deleteMutation = useMutation({
		mutationFn: deleteSubtopic,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['subtopics'],
				exact: true,
				refetchType: 'active',
			})
		},
	})

	const onSubmit = async (subtopic: SubtopicForm) => {
		if (topicId) {
			addMutation.mutate({ subtopic, topicId: Number(topicId) })
		} else {
			throw new Response('Erro interno', { status: 500 })
		}
	}

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
						{...register('subtopic_name', { required: true, maxLength: 64 })}
						aria-invalid={errors.subtopic_name ? 'true' : 'false'}
					/>
					{errors.subtopic_name?.type === 'required' && (
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
				<List title="Subtópicos">
					{props.subtopics.map((subtopic: ISubtopic) => (
						<Card
							key={subtopic.subtopic_id}
							title={subtopic.subtopic_name}
							description={subtopic.description}
							link={`${subtopic.subtopic_id}/posts`}
						>
							<ItemsCardButtons>
								<StyledItemsCardButton>
									<HiOutlinePencilAlt size={20} />
								</StyledItemsCardButton>

								<StyledItemsCardButton
									onClick={() => handleDelete(subtopic.subtopic_id)}
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
	)
}

export default SubtopicsAdmin
