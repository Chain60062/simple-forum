import { useQuery } from '@tanstack/react-query'
import { getTopics } from '../../api/topics'
import List, { ItemCard as Card } from '../../components/Lists' //ItemsList as List, ItemCard
import { useUser } from '../../hooks/useUser'
import { CenteredContainer } from '../../styles/Lists'
import ErrorComponent from '../error/Error'
import { MainContent } from '../posts/Posts.styles'
import TopicsAdmin from './Topics.admin'
import type { ITopic } from './Topics.interfaces'

const Topics = () => {
	const user = useUser()
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['topics'],
		queryFn: getTopics,
	})
	if (isLoading) {
		return <MainContent />
	}
	if (error instanceof Error && isError) {
		return <ErrorComponent />
	}
	return (
		<>
			{user.data?.user_role === 'admin' ? (
				<TopicsAdmin topics={data} />
			) : (
				<CenteredContainer>
					<List title="Tópicos">
						{data.map((topic: ITopic) => (
							<Card
								key={topic.topic_id}
								title={topic.topic_name}
								description={topic.description}
								link={`${topic.topic_id}/subtopics`}
							/>
						))}
					</List>
				</CenteredContainer>
			)}
		</>
	)
}

export default Topics
