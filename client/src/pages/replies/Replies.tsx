import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type FocusEvent, type KeyboardEvent, useContext } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { getPostById, getPostReplies } from '../../api/posts'
import { addReply, editReply } from '../../api/replies'
import { useUser } from '../../hooks/useUser'
import { AddForm, FormFooter, Submit, TextInput } from '../../styles/Forms'
import { MainLoader } from '../../styles/Loaders'
import { SERVER_URL } from '../../util/config'
import type { IReply, ReplyForm } from './Replies.interfaces'
import {
	AddCommentContainer,
	Dropdown,
	DropdownContent,
	PostContainer,
	RepliesContainer,
	ReplyAvatar,
	ReplyComment,
	ReplyContainer,
} from './Replies.styles'

export default function Replies() {
	const { postId } = useParams() as { postId: string }
	const queryClient = useQueryClient()
	const user = useUser()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ReplyForm>()

	const post = useQuery({
		queryKey: ['post', postId],
		queryFn: () => getPostById(postId),
		refetchOnWindowFocus: false,
	})

	const replies = useQuery({
		queryKey: ['replies', postId],
		queryFn: () => getPostReplies(postId),
		refetchOnWindowFocus: false,
	})

	const addMutation = useMutation({
		mutationFn: addReply,
		onSuccess: async (newReply) => {
			queryClient.setQueryData<Array<IReply> | undefined>(
				['replies'],
				(old) => [newReply, ...(old as Array<IReply>)],
			)
		},
		onError: (err: Error) => {
			alert(`Houve um erro: ${err.message}`)
		},
	})

	const editMutation = useMutation({
		mutationFn: editReply,
		onSuccess: async () => {
			queryClient.invalidateQueries()
		},
		onError: (err) => {
			alert(`Houve um erro: ${err}`)
		},
	})
	// handle submit
	const onSubmit: SubmitHandler<ReplyForm> = async (data) =>
		addMutation.mutate({ data, postId })

	const handleReplyEditEnterPress = (
		e: KeyboardEvent<HTMLSpanElement>,
		reply_id: string,
	) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (e.currentTarget.textContent != null && reply_id != null) {
				editMutation.mutate({
					data: { message: e.currentTarget.textContent },
					replyId: reply_id,
				})
			}
		}
	}

	const handleReplyEditOnFocusOut = (
		e: FocusEvent<HTMLSpanElement>,
		reply_id: string,
	) => {
		e.preventDefault()
		// if (e.currentTarget.textContent != null && reply_id != null) {
		//   editMutation.mutate({
		//     data: { message: e.currentTarget.textContent },
		//     replyId: reply_id,
		//   });
		// }
	}

	if (post.error instanceof Error && post.isError) {
		return <span>Error: {post.error.message}</span>
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
							<label htmlFor="name">Comentário</label>
							<TextInput
								type="text"
								id="title"
								{...register('message', {
									required: true,
									maxLength: 64,
								})}
								aria-invalid={errors.message ? 'true' : 'false'}
							/>
							{errors.message?.type === 'required' && (
								<p role="alert">Mensagem é obrigatória</p>
							)}
							<FormFooter>
								<Submit type="submit">Comentar</Submit>
							</FormFooter>
						</AddForm>
					</AddCommentContainer>

					<RepliesContainer>
						{replies.data.map((reply: IReply) => (
							<ReplyContainer key={reply.reply_id}>
								<ReplyAvatar
									src={`${SERVER_URL}/${reply.avatar}`}
									alt="avatar"
								/>
								<p>
									{reply.user_name}:
									<ReplyComment
										contentEditable={
											user.data?.user_id === reply.user_id ? 'true' : 'false'
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
									<DropdownContent className="dropdown-content">
										{/* <a onClick={() => setParentId(reply.replyId)}>Reply</a> */}
									</DropdownContent>
								</Dropdown>
							</ReplyContainer>
						))}
					</RepliesContainer>
				</>
			)}
		</>
	)
}
