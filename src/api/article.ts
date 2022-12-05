import { GET, POST, DELETE, PUT } from "./config";

interface articleAPIBodyProps {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export const postArticles = (url: string, body: articleAPIBodyProps) =>
  POST(url, body);

export const getArticles = (url: string) => GET(url);

export const deleteArticles = (url: string) => DELETE(url);

export const putArticles = (url: string, body: articleAPIBodyProps) =>
  PUT(url, body);
