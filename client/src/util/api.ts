import { LoginForm } from "../login/Login.types";
import { UserForm } from "../signup/Signup.types";

const url = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8085';

export const login = async (data: LoginForm) => {
  const res = await fetch(`${url}/auth/login`, {
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
  const res = await fetch(`${url}/auth/login`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
export const addUser = async (data: UserForm) => {
  const res = await fetch(`${url}/user`, {
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

export const getPosts = async (subtopicId: string) => {
  const res = await fetch(`${url}/posts/subtopic/${subtopicId}`);
  return res.json();
};

export const getUser = async (username: string) => {
  const res = await fetch(`${url}/user/${username}`);
  return res.json();
};

export const getUserImage = async (avatar: string) => {
  const res = await fetch(`${url}/${avatar}`);
  const imageBlob = await res.blob();
  return URL.createObjectURL(imageBlob);
};

export const getSubtopics = async (topicId: string | undefined) => {
  const res = await fetch(`${url}/subtopics/${topicId}`);
  return res.json();
};

export const getTopics = async () => {
  const res = await fetch(`${url}/topics`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const getPostById = async (postId: string) => {
  const res = await fetch(`${url}/posts/${postId}`)
  return res.json();
};

export const getPostReplies = async (postId: string) => {
  const res = await fetch(`${url}/replies/${postId}`)
  return res.json();
};