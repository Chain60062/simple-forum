import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { HiIdentification, HiOutlineLockClosed } from 'react-icons/hi'
import { Navigate } from 'react-router'
import { toast } from 'sonner'
import { login } from '../../api/auth'
import { useUser } from '../../hooks/useUser'
import {
	Container,
	Input,
	InputIcon,
	RequiredAlert,
	Row,
	StyledForm,
	SubmitButton,
	Title,
} from '../../styles/Forms'
import type { LoginForm } from './Login.types'

const LoginPage = () => {
	const user = useUser()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginForm>()

	const { mutate, isSuccess, data } = useMutation({
		mutationFn: login,
		onSuccess: async (data) => {
			if (data.status === 401) {
				toast.error(await data.json())
				reset()
			}
		},
	})

	const onSubmit: SubmitHandler<LoginForm> = async (user) => mutate(user)

	if (isSuccess) {
		if (data.status !== 401) {
			return <Navigate to="/" />
		}
	}

	return (
		<Container>
			<Title>Entrar</Title>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<InputIcon>
						<HiIdentification />
					</InputIcon>
					<Input
						type="text"
						placeholder="E-mail"
						{...register('email', { required: true })}
					/>
				</Row>
				{errors.email?.type === 'required' && (
					<RequiredAlert role="alert">E-Mail é obrigatório</RequiredAlert>
				)}
				<Row>
					<InputIcon>
						<HiOutlineLockClosed />
					</InputIcon>
					<Input
						type="password"
						placeholder="Senha"
						{...register('password', { required: true })}
					/>
				</Row>
				{errors.password?.type === 'required' && (
					<RequiredAlert role="alert">Senha é obrigatória</RequiredAlert>
				)}
				<Row>
					<SubmitButton type="submit">Entrar</SubmitButton>
				</Row>
			</StyledForm>
		</Container>
	)
}
export default LoginPage
