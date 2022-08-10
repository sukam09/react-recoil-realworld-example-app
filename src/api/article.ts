import { AxiosRequestConfig } from "axios";

import api from "@/api";
import { ArticleProps } from "@/shared/type";

export const postArticles = async (
  url: string,
  data: { article: ArticleProps },
  config: AxiosRequestConfig
) => {
  return await api.post(url, data, config);
};

export const getArticles = async (url: string) => {
  return await api.get(url);
};
