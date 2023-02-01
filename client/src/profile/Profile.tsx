import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser, getUserImage } from '../util/api';
import { UserContext } from '../context/UserContext';
import { Avatar, Container, Options, Username } from './Profile.styled';
const url = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8085';

const Profile = () => {
  const { username } = useParams();
  if (typeof username === 'undefined') return <></>;
  const { loggedUser } = useContext(UserContext);
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(username),
  });
  // const avatar = user?.avatar;
  // const image = useQuery({
  //   queryKey: ['image'],
  //   queryFn: () => getUserImage(avatar),
  //   enabled: !!avatar,
  // });

  return (
    <div>
      <Container>
        {!isLoading && <Avatar src={`${url}/${user?.avatar}`} alt='Perfil' />}
        <Username>{user?.nickname}</Username>
      </Container>
      {loggedUser?.profile_id === user?.profile_id && <Options></Options>}
    </div>
  );
};

export default Profile;

