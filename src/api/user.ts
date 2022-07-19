import api from "./api";

interface LoginBody {
  email: string;
  password: string;
}

interface UserBody extends LoginBody {
  username: string;
}

export const postUser = async (url: string, body: { user: UserBody }) => {
  return await api.post(url, body);
};

export const postUserLogin = async (url: string, body: { user: LoginBody }) => {
  return await api.post(url, body);
};

export const getUser = async (
  url: string,
  headers: { headers: { Authorization: string } }
) => {
  return await api.get(url, headers);
};
