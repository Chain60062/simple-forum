import React from 'react';
import List, { Card } from '../common/List';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const url = import.meta.REACT_APP_SERVER_URL || 'http://localhost:8085';

const Topics = () => {
  const { data, error, isLoading } = useSWR(`${url}/topics`, fetcher);

  if (error) return <h1>Ops! Algo deu errado</h1>;
  if (isLoading) return <List>Carregando...</List>;

  return (
    <List title='Principais Tópicos'>
      {data.map((topic, index) => (
        <Card
          key={index}
          title={topic.topic_name}
          description={topic.description}
          link={`${topic.topic_id}/subtopics`}
        />
      ))}
    </List>
  );
};

export default Topics;

