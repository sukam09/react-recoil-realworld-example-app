import { GET, POST, DELETE, PUT } from './config';

interface articleAPIBodyProps {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export const getArticles = (query: string, signal: AbortSignal) =>
  GET(`/articles${query}`, signal);

export const postArticle = (body: articleAPIBodyProps) =>
  POST('/articles', body);

export const getArticle = (slug: string) => GET(`/articles/${slug}`);

export const putArticle = (slug: string, body: articleAPIBodyProps) =>
  PUT(`/articles/${slug}`, body);

export const deleteArticle = (slug: string) => DELETE(`/articles/${slug}`);
