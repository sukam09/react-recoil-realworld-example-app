import { AxiosRequestConfig } from "axios";

import api from "@/api";
import { ArticleDataProps } from "@/types/type";

export const postArticles = async (
  url: string,
  data: ArticleDataProps,
  config: AxiosRequestConfig
) => {
  return await api.post(url, data, config);
};
