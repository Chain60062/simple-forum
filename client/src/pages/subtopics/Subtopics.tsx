import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getSubtopics } from '../../api/subtopics'
import SubtopicList, { TopicCard as SubtopicCard } from '../../components/TopicList/TopicList'
import { useUser } from '../../hooks/useUser'
import { CenteredContainer } from '../../components/TopicList/TopicList.styles'
import { Loading } from '../../styles/Loading'
import SubtopicsAdmin from './Subtopics.admin'
import type { Subtopic } from './Subtopics.interfaces'

const Subtopics = () => {
	const { topicId } = useParams()
	const user = useUser()
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['subtopics'],
		queryFn: () => getSubtopics(Number(topicId)),
	})

	if (isLoading) {
		return <Loading />
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
					<SubtopicList title="Subtópicos">
						{data.map((subtopic: Subtopic) => (
							<SubtopicCard
								key={subtopic.subtopic_id}
								title={subtopic.subtopic_name}
								description={subtopic.description}
								link={`${subtopic.subtopic_id}/posts`}
							/>
						))}
					</SubtopicList>
				</CenteredContainer>
			)}
		</>
	)
}

export default Subtopics
