import api from "./api";
import { UserProps } from "../types/type";

export const postUser = async (url: string, body: { user: UserProps }) => {
  return await api.post(url, body);
};

export const postUserLogin = async (url: string, body: { user: UserProps }) => {
  return await api.post(url, body);
};
