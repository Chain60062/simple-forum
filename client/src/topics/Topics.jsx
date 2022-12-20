import React from 'react';
import List, { Card } from '../common/List';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const url = import.meta.REACT_APP_SERVER_URL || 'http://localhost:8085';

const Topics = () => {
  const { data, error, isLoading } = useSWR(`${url}/topics`, fetcher);

  if (error) return <h1>Ops! Algo deu errado</h1>;
  if (isLoading) return <List>Carregando...</List>;
  console.log(data[0].topic_id);
  return (
    <List title='Principais Tópicos'>
      {data.map((topic, index) => (
        <Card
          key={index}
          title={topic.topic_name}
          description={topic.description}
          topicId={topic.topic_id}
          link={`${topic.topic_name
            .replace(/\s+/g, '-')
            .toLowerCase()}/subtopics`}
          state={topic.topic_id}
        />
      ))}
    </List>
  );
};

export default Topics;

