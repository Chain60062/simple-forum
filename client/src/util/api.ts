import { LoaderFunctionArgs } from 'react-router-dom';
import { LoginForm } from '../login/Login.types';
import { PostFormData } from '../posts/Posts.types';
import { ReplyForm } from '../replies/Replies.types';
import { UserForm } from '../signup/Signup.types';
import { SubtopicForm } from '../subtopics/Subtopics.types';
import { ITopic, TopicForm } from '../topics/Topics.interfaces';
import { SERVER_URL } from './config';
//
// TOPICS
//
export const getTopics = async () => {
  const res = await fetch(`${SERVER_URL}/topics`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res?.ok) {
    throw new Error('Erro inesperado na requisição.');
  }

  return res.json();
};
export const deleteTopic = async (topicId: number) => {
  const res = await fetch(`${SERVER_URL}/topics/${topicId}`, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res?.ok) {
    throw new Error('Erro inesperado na requisição.');
  }

  return res.json();
};
interface EditTopicParams {
  topic: TopicForm;
  topicId: number;
}
export const updateTopic = async ({ topic, topicId }: EditTopicParams) => {
  const res = await fetch(`${SERVER_URL}/topics/${topicId}`, {
    method: 'PUT ',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topic),
  });

  if (!res?.ok) {
    throw new Error('Erro inesperado na requisição.');
  }

  return res.json();
};
//
// SUBTOPICS
//
export const getSubtopics = async (topicId: number | undefined) => {
  const res = await fetch(`${SERVER_URL}/subtopics/${topicId}`);
  return res.json();
};

export const addTopic = async (data: ITopic) => {
  const res = await fetch(`${SERVER_URL}/topics`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

interface AddSubtopicParams {
  subtopic: SubtopicForm;
  topicId: number;
}

export const addSubtopic = async ({ subtopic, topicId }: AddSubtopicParams) => {
  const res = await fetch(`${SERVER_URL}/subtopics/${topicId}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subtopic),
  });
  return res.json();
};
//
// POSTS
//
export const getPostById = async (postId: string) => {
  const res = await fetch(`${SERVER_URL}/posts/${postId}`);
  return res.json();
};

export const getPostReplies = async (postId: string) => {
  const res = await fetch(`${SERVER_URL}/replies/${postId}`);
  return res.json();
};

export const getPosts = async (subtopicId: string) => {
  const res = await fetch(`${SERVER_URL}/posts/subtopic/${subtopicId}`);
  return res.json();
};

interface AddPostParams {
  post: PostFormData;
  subtopicId: number;
}
export const addPost = async ({ post, subtopicId }: AddPostParams) => {
  const formData = new FormData();

  formData.append('title', post.title);
  formData.append('message', post.message);

  // Append the files to the FormData object
  for (const file of post.files) {
    formData.append('files', file, file.name);
  }
  const res = await fetch(`${SERVER_URL}/posts/${subtopicId}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: formData,
  });
  return res.json();
};
//
// User
//
export const login = async (data: LoginForm) => {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res;
};

export const isLoggedIn = async () => {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const userExists = async ({ params }: LoaderFunctionArgs) => {
  const user = await fetch(`${SERVER_URL}/users/${params.username}`);
  if (user.status === 404) {
    throw new Response('Não Encontrado', { status: 404 });
  }
  return true;
};

export const logout = async () => {
  await fetch(`${SERVER_URL}/auth/signout`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getLoggedInUser = async () => {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const user = await res.json();
  return user;
};
//
// PROFILE/USERS
//
export const addUser = async (data: UserForm) => {
  const res = await fetch(`${SERVER_URL}/users`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res;
};

export const getUser = async (username: string) => {
  const res = await fetch(`${SERVER_URL}/users/${username}`);
  return res.json();
};

export const getUserImage = async (avatar: string) => {
  const res = await fetch(`${SERVER_URL}/${avatar}`);
  const imageBlob = await res.blob();
  return URL.createObjectURL(imageBlob);
};

//
// REPLIES
//
interface AddReplyParams {
  data: ReplyForm;
  postId: string | undefined;
}
export const addReply = async ({ data, postId }: AddReplyParams) => {
  const res = await fetch(`${SERVER_URL}/replies/${postId}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

