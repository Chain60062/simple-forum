import { LoginForm } from "../login/Login.types";
import { SERVER_URL } from "../util/config";

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