import { useQuery } from '@tanstack/react-query'
import { getTopics } from '../../api/topics'
import TopicList, { TopicCard } from '../../components/TopicList/TopicList'
import { useUser } from '../../hooks/useUser'
import { CenteredContainer } from '../../components/TopicList/TopicList.styles'
import ErrorComponent from '../error/Error'
import { MainContent } from '../posts/Posts.styles'
import TopicsAdmin from './Topics.admin'
import type { Topic } from './Topics.interfaces'

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
					<TopicList title="Tópicos">
						{data.map((topic: Topic) => (
							<TopicCard
								key={topic.topic_id}
								title={topic.topic_name}
								description={topic.description}
								link={`${topic.topic_id}/subtopics`}
							/>
						))}
					</TopicList>
				</CenteredContainer>
			)}
		</>
	)
}

export default Topics
