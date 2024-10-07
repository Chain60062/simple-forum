import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { addPost, getPosts } from '../../api/posts'
import TopNav from '../../components/TopNav/TopNav.js'
import { useUser } from '../../hooks/useUser.js'
import { AddForm, FormFooter, TextInput } from '../../styles/Forms.js'
import Carousel from './Carousel.js'
import type { Post, PostForm, PostProps } from './Posts.interfaces.js'
import {
	AddPostContainer,
	Container,
	FileInput,
	MainContent,
	PostCard,
	PostFooter,
	SidebarBody,
	SidebarLink,
	TextArea,
	CreatePostButton
} from './Posts.styles'

const Posts = () => {
	const { subtopicId } = useParams() as { subtopicId: string }
	const user = useUser()
	const queryClient = useQueryClient()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostForm>()

	const { mutate } = useMutation({
		mutationFn: addPost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
		},
		onError: (err: Error) => {
			toast.error(`there was an error ${err}`)
		},
	})

	const { isLoading, data, isError, error } = useQuery({
		queryKey: ['posts'],
		queryFn: () => getPosts(subtopicId),
	})

	const onSubmit = async (post: PostForm) => {
		if (subtopicId) {
			mutate({ post, subtopicId: Number(subtopicId) })
		} else {
			toast.error('Não foi possível criar o post um erro inesperado ocorreu.')
		}
	}

	if (isLoading) {
		return <MainContent />
	}

	if (error instanceof Error && isError) {
		return <span>Erro: {error.message}</span>
	}

	return (
		<Container>
			<TopNav />
			<Sidebar />
			<MainContent>
				{user.data && (
					<AddPostContainer>
						<AddForm onSubmit={handleSubmit(onSubmit)}>
							<label htmlFor="title">Título</label>
							<TextInput
								type="text"
								id="title"
								{...register('title', { required: true, maxLength: 64 })}
								aria-invalid={errors.title ? 'true' : 'false'}
							/>
							{errors.title?.type === 'required' && (
								<p role="alert">Título é obrigatório</p>
							)}
							<label htmlFor="message">Mensagem</label>

							<TextArea
								id="message"
								{...register('message', { required: true, maxLength: 2000 })}
								aria-invalid={errors.message ? 'true' : 'false'}
							/>
							{errors.message?.type === 'required' && (
								<p role="alert">Mensagem é obrigatória</p>
							)}
							<FileInput
								type="file"
								multiple
								{...register('files', { required: false, max: 3 })}
							/>
							<FormFooter>
								<CreatePostButton type="submit">Postar</CreatePostButton>
							</FormFooter>
						</AddForm>
					</AddPostContainer>
				)}
				{data.map((post: Post) => (
					<SinglePost
						key={post.post_id}
						title={post.title}
						message={post.message}
						files={post.files}
						link={`${post.post_id}`}
					/>
				))}
			</MainContent>
		</Container>
	)
}

const SinglePost = ({title, files, link, message}: PostProps) => {
	return (
		<PostCard>
			<h2>{title}</h2>
			<Carousel images={files} link={link} />
			<p>{message}</p>
			<PostFooter>
				<HiOutlinePencilAlt size={2} />
				<HiTrash size={2} />
			</PostFooter>
		</PostCard>
	)
}

const Sidebar = () => {
	return (
		<SidebarBody>
			<div>
				<SidebarLink to="nowhere">Link</SidebarLink>
				<SidebarLink to="nowhere">Link</SidebarLink>
				<SidebarLink to="nowhere">Link</SidebarLink>
				<SidebarLink to="nowhere">Link</SidebarLink>
			</div>
		</SidebarBody>
	)
}
export default Posts
