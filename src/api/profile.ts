import { DELETE, GET, POST } from "./config";

export const getProfile = (url: string) => GET(url);
export const postFollow = (url: string) => POST(url);
export const deleteFollow = (url: string) => DELETE(url);
