import { AxiosRequestConfig } from "axios";

import api from "@/api";
import { UserDataProps } from "@/types/type";

export const postUser = async (url: string, data: UserDataProps) => {
  return await api.post(url, data);
};

export const putUser = async (
  url: string,
  data: UserDataProps,
  config: AxiosRequestConfig
) => {
  return await api.put(url, data, config);
};

export const getUser = async (url: string, config: AxiosRequestConfig) => {
  return await api.get(url, config);
};
