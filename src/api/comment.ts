import { GET, POST, DELETE } from './config';

export const postComment = (
  slug: string,
  body: { comment: { body: string } }
) => POST(`/articles/${slug}/comments`, body);

export const getComments = (slug: string) => GET(`/articles/${slug}/comments`);

export const deleteComment = (slug: string, id: number) =>
  DELETE(`/articles/${slug}/comments/${id}`);
