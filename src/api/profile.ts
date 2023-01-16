import { DELETE, GET, POST } from './config';

export const getProfile = (username: string) => GET(`/profiles/${username}`);

export const postFollow = (username: string) =>
  POST(`/profiles/${username}/follow`);

export const deleteFollow = (username: string) =>
  DELETE(`/profiles/${username}/follow`);
