import React from 'react';
import List, { Card } from '../common/List';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const url = import.meta.REACT_APP_SERVER_URL || 'http://localhost:8085';

const Subtopics = () => {
  const { topicId } = useParams();
  const { data, error, isLoading } = useSWR(
    `${url}/subtopics/${topicId}`,
    fetcher
  );

  if (error) return <h1>Ops! Algo deu errado</h1>;
  if (isLoading) return <List>Carregando...</List>;

  return (
    <List title='Subtópicos'>
      {data.map((subtopic, index) => (
        <Card
          key={index}
          title={subtopic.subtopic_name}
          description={subtopic.description}
          link={`${subtopic.subtopic_id}/posts`}
        />
      ))}
    </List>
  );
};
Subtopics.propTypes = {
  topicId: PropTypes.number,
};

export default Subtopics;



