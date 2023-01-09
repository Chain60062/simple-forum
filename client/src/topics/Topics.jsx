import React, { useState, useEffect } from 'react';
import List, { Card } from '../common/List';
const url = import.meta.REACT_APP_SERVER_URL || 'http://localhost:8085';

const Topics = () => {
  const [topics, setTopics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${url}/topics`)
      .then((res) => res.json())
      .then(
        (data) => {
          setLoading(false);
          setTopics(data);
        },
        (err) => {
          setLoading(true);
          setError(err);
        }
      );
  }, []);

  return (
    <List title='Principais Tópicos'>
      {!loading && topics.map((topic) => (
        <Card
          key={topic.topic_id}
          title={topic.topic_name}
          description={topic.description}
          link={`${topic.topic_id}/subtopics`}
        />
      ))}
    </List>
  );
};

export default Topics;

