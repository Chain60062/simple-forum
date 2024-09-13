import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { HiMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { addUser } from '../../api/users'
import {
	Container,
	Input,
	InputIcon,
	RequiredAlert,
	StyledGridForm,
	SubmitButton,
	Title,
} from '../../styles/Forms'
import type { RegisterForm } from './Register.interfaces'

const Register = () => {
	const {
		handleSubmit,
		register,
		reset,
		resetField,
		formState: { errors },
	} = useForm<RegisterForm>()

	const { mutate, isSuccess, data } = useMutation({
		mutationFn: addUser,
		onSuccess: (data) => {
			if (data.status !== 201) {
				toast.error('Houve um erro, tente novamente.')
				reset()
			} else {
				toast.success('Cadastro realizado com sucesso, redirecionando...')
			}
		},
		onError: () => {
			toast.error('Houve um erro, tente novamente.')
			reset()
		},
	})

	const onSubmit: SubmitHandler<RegisterForm> = (formData) => {
		if (formData.password !== formData.password_confirm) {
			toast.error('As senhas não coincidem')
			resetField('password')
			resetField('password_confirm')
		} else {
			mutate(formData)
		}
	}

	if (isSuccess && data.status === 201) return <Navigate to="/login" />

	return (
		<>
			<Container>
				<Title>Criar Conta</Title>
				<StyledGridForm onSubmit={handleSubmit(onSubmit)}>
					<div>
						{errors.user_name?.type === 'required' && (
							<RequiredAlert role="alert">Usuário é obrigatório.</RequiredAlert>
						)}
						<InputIcon>
							<HiOutlineUser />
						</InputIcon>
						<Input
							type="text"
							placeholder="Nome"
							{...register('user_name', { required: true })}
						/>
					</div>

					<div>
						{errors.profile_name?.type === 'required' && (
							<RequiredAlert role="alert">Nome é obrigatório.</RequiredAlert>
						)}
						<InputIcon>
							<HiOutlineUser />
						</InputIcon>
						<Input
							type="text"
							placeholder="Nome do Perfil"
							{...register('profile_name', { required: true })}
						/>
					</div>
					<div>
						{errors.email?.type === 'required' && (
							<RequiredAlert role="alert">E-Mail é obrigatório.</RequiredAlert>
						)}
						<InputIcon>
							<HiMail />
						</InputIcon>
						<Input
							type="email"
							placeholder="E-mail"
							{...register('email', { required: true })}
						/>
					</div>
					<div>
						{errors.password?.type === 'required' && (
							<RequiredAlert role="alert">Senha é obrigatória.</RequiredAlert>
						)}
						<InputIcon>
							<HiOutlineLockClosed />
						</InputIcon>
						<Input
							type="password"
							placeholder="Senha"
							{...register('password', { required: true })}
						/>
					</div>
					<div>
						{errors.password?.type === 'required' && (
							<RequiredAlert role="alert">Confirme a senha.</RequiredAlert>
						)}
						<InputIcon>
							<HiOutlineLockClosed />
						</InputIcon>
						<Input
							type="password"
							placeholder="Confirmar Senha"
							{...register('password_confirm', { required: true })}
						/>
						<SubmitButton type="submit">Cadastrar</SubmitButton>
					</div>
				</StyledGridForm>
			</Container>
		</>
	)
}

export default Register
