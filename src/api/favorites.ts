import { POST, DELETE } from './config';

export const postFavorites = (slug: string) =>
  POST(`/articles/${slug}/favorite`);

export const deleteFavorites = (slug: string) =>
  DELETE(`/articles/${slug}/favorite`);
