import React, { useState, useEffect } from 'react';
import List, { Card } from '../common/List';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
const url = import.meta.REACT_APP_SERVER_URL || 'http://localhost:8085';

const Subtopics = () => {
  const { topicId } = useParams();
  const [subtopics, setSubtopics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${url}/subtopics/${topicId}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setLoading(false);
          setSubtopics(data);
        },
        (err) => {
          setLoading(true);
          setError(err);
        }
      );
  }, []);
  return (
    <List title='Subtópicos'>
      {!loading && subtopics.map((subtopic) => (
        <Card
          key={subtopic.subtopic_id}
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

