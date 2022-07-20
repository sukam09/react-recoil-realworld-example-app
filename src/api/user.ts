import api from "./api";

interface UserProps {
  user: {
    username?: string;
    email: string;
    password: string;
  };
}

export const postUser = async (url: string, body: UserProps) => {
  return await api.post(url, body);
};

export const postUserLogin = async (url: string, body: UserProps) => {
  return await api.post(url, body);
};
