import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../util/api';
import { UserContext } from '../context/UserContext';
import { Avatar, Container, Options, Username } from './Profile.styles';
import { SERVER_URL } from '../util/config';

const Profile = () => {
  const { username } = useParams();
  const { loggedUser } = useContext(UserContext);
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(username || ''), //if username is null or undefined pass empty
  });

  return (
    <div>
      <Container>
        {!isLoading && <Avatar src={`${SERVER_URL}/${user?.avatar}`} alt='Perfil' />}
        <Username>{user?.nickname}</Username>
      </Container>
      {loggedUser?.profile_id === user?.profile_id && (
      <Options>
        
      </Options>
      )}
    </div>
  );
};

export default Profile;

