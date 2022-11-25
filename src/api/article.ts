import { GET, POST, DELETE } from "./config";

export const postArticles = (
  url: string,
  body: {
    article: {
      title: string;
      description: string;
      body: string;
      tagList: string[];
    };
  }
) => POST(url, body);

export const getArticles = (url: string) => GET(url);

export const deleteArticles = (url: string) => DELETE(url);
