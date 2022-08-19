import { AxiosRequestConfig } from "axios";
import api from "@/api";

export const postArticles = async (
  url: string,
  data: {
    article: {
      title: string;
      description: string;
      body: string;
      tagList: string[];
    };
  },
  config: AxiosRequestConfig
) => {
  return await api.post(url, data, config);
};

export const getArticles = async (url: string, config?: AxiosRequestConfig) => {
  return await api.get(url, config);
};
