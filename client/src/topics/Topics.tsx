import { useContext } from 'react';
import List, { ItemCard as Card } from '../components/Lists'; //ItemsList as List, ItemCard
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../context/UserContext';
import { getTopics } from '../api/topics';
import { ITopic } from './Topics.interfaces';
import { CenteredContainer } from '../styles/Lists';
import ErrorComponent from '../error/Error';
import TopicsAdmin from './Topics.admin';
import { MainContent } from '../posts/Posts.styles';

const Topics = () => {
  const { loggedUser } = useContext(UserContext);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  });
  if (isLoading) {
    return <MainContent />;
  }
  if (error instanceof Error && isError) {
    return <ErrorComponent />;
  }
  return (
    <>
      {loggedUser?.user_role == 'admin' ? (
        <TopicsAdmin topics={data} />
      ) : (
        <CenteredContainer>
          <List title='Tópicos'>
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
  );
};

export default Topics;


