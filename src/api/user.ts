import api from "@/api";
import { BodyProps } from "@/types/type";

export const postUser = async (url: string, body: BodyProps) => {
  return await api.post(url, body);
};

export const postUserLogin = async (url: string, body: BodyProps) => {
  return await api.post(url, body);
};

// TODO: change config type
export const putUser = async (url: string, body: BodyProps, config: any) => {
  return await api.put(url, body, config);
};

export const getUser = async (url: string, config: any) => {
  return await api.get(url, config);
};
