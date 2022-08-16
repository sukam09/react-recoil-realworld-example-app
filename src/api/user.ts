import { AxiosRequestConfig } from "axios";

import api from "@/api";
import { LoginUserProps, UserProps } from "@/shared/type";

export const postUser = async (url: string, data: { user: LoginUserProps }) => {
  return await api.post(url, data);
};

export const putUser = async (
  url: string,
  data: { user: UserProps },
  config: AxiosRequestConfig
) => {
  return await api.put(url, data, config);
};

export const getUser = async (url: string, config: AxiosRequestConfig) => {
  return await api.get(url, config);
};
