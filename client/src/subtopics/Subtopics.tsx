import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../context/UserContext';
import List, { ItemCard as Card } from '../components/Lists'; //ItemsList as List, ItemCard
import { getSubtopics } from '../api/subtopics';
import { CenteredContainer } from '../styles/Lists';
import { ISubtopic } from './Subtopics.interfaces';
import SubtopicsAdmin from './Subtopics.admin';
import { MainLoader } from '../styles/Loaders';

const Subtopics = () => {
  const { topicId } = useParams();
  const { loggedUser } = useContext(UserContext);
  const { data, error, isError, isLoading } = useQuery(['subtopics'], () =>
    getSubtopics(Number(topicId))
  );

  if (isLoading) {
    return <MainLoader/>;
  }

  if (error instanceof Error && isError) {
    return <span>Erro: {error.message}</span>;
  }
  return (
    <>
      {loggedUser?.user_role == 'admin' ? (
        <SubtopicsAdmin subtopics={data} />
      ) : (
        <CenteredContainer>
          <List title='Subtópicos'>
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
  );
};

export default Subtopics;

