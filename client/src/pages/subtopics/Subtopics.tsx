import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getSubtopics } from '../../api/subtopics'
import List, { ItemCard as Card } from '../../components/Lists' //ItemsList as List, ItemCard
import { useUser } from '../../hooks/useUser'
import { CenteredContainer } from '../../styles/Lists'
import { MainLoader } from '../../styles/Loaders'
import SubtopicsAdmin from './Subtopics.admin'
import type { ISubtopic } from './Subtopics.interfaces'

const Subtopics = () => {
	const { topicId } = useParams()
	const user = useUser()
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['subtopics'],
		queryFn: () => getSubtopics(Number(topicId)),
	})

	if (isLoading) {
		return <MainLoader />
	}

	if (error instanceof Error && isError) {
		return <span>Erro: {error.message}</span>
	}
	return (
		<>
			{user.data?.user_role === 'admin' ? (
				<SubtopicsAdmin subtopics={data} />
			) : (
				<CenteredContainer>
					<List title="Subtópicos">
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
			)}
		</>
	)
}

export default Subtopics
