import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HiMenu } from 'react-icons/hi'
import { toast } from 'sonner'
import { logout } from '../api/auth'
import { useUser } from '../hooks/useUser'
import {
	LogoutNavLink,
	NavLink,
	TopNavBody,
	TopNavIcon,
} from '../styles/TopNav'

const TopNav = () => {
	const user = useUser()
	const queryClient = useQueryClient()

	const handleLogout = () => {
		logoutMutation.mutate()
	}
	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			//a documentação não dá muitos exemplos, creio que somente o resetQueries seja suficiente,
			//mas a descrição do resetQueries não cita nada sobre caching, por isso o removeQueries
			//pode ser redundante aqui
			queryClient.resetQueries({ queryKey: ['user'] })
			queryClient.removeQueries({ queryKey: ['user'] })
		},
		onError: () => {
			toast.error('Erro ao sair da aplicação.')
		},
	})
	return (
		<TopNavBody>
			<NavLink to="/">Home</NavLink>

			{user.data ? (
				<>
					<NavLink style={{ float: 'right' }} to={`/${user.data.profile_name}`}>
						{user.data.user_name}
					</NavLink>

					<LogoutNavLink
						style={{ float: 'right' }}
						onClick={() => handleLogout()}
					>
						Logout
					</LogoutNavLink>
				</>
			) : (
				<>
					<NavLink style={{ float: 'right' }} to="/cadastro">
						Cadastrar
					</NavLink>

					<NavLink style={{ float: 'right' }} to="/login">
						Login
					</NavLink>
				</>
			)}

			<TopNavIcon as={HiMenu} size={28} />
		</TopNavBody>
	)
}

export default TopNav
