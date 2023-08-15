import { LoginForm } from '../login/Login.types';
import { PostFormData } from '../posts/Posts.types';
import { ReplyForm } from '../replies/Replies.types';
import { UserForm } from '../signup/Signup.types';
import { ITopic } from '../topics/Topics.types';
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
//
// SUBTOPICS
//
export const getSubtopics = async (topicId: string | undefined) => {
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
  data: PostFormData;
  subtopicId: string | undefined;
}
export const addPost = async ({ data, subtopicId }: AddPostParams) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('message', data.message);

  // Append the files to the FormData object
  for (const file of data.files) {
    formData.append('files', file, file.name);
  }
  const res = await fetch(`${SERVER_URL}/posts/${subtopicId}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: formData,
  });
  console.dir(res.json);
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
  return res.json();
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
  return res.json();
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

