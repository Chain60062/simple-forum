import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getUser, userExists } from '../../api/users'
import { useUser } from '../../hooks/useUser'
import { SERVER_URL } from '../../util/config'
import { Avatar, Container, Options, Username } from './Profile.styles'
import type { Route } from './+types/Profile'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const isValidUser = await userExists(params.username);
  console.log(isValidUser)
  if(!isValidUser){
	throw new Response("Not Found", {status: 404})
  }
}

const Profile = () => {
	const { username } = useParams() as { username: string }
	const loggedUser = useUser()
	const { data, isLoading } = useQuery({
		queryKey: ['profileUser', username],
		queryFn: () => getUser(username),
	})
	return (
		<div>
			<Container>
				{!isLoading && (
					<Avatar src={`${SERVER_URL}/images/${data?.avatar}`} alt="Perfil" />
				)}
				<Username>{data?.nickname}</Username>
			</Container>
			{loggedUser.data?.profile_id === data?.profile_id && <Options />}
		</div>
	)
}

export default Profile
