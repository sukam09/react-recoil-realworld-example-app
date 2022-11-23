import { GET, POST, PUT } from "./config";
import { AuthProps, UserProps } from "../types";

export const postUser = (url: string, body: { user: AuthProps }) =>
  POST(url, body);

export const putUser = (url: string, body: { user: UserProps }) =>
  PUT(url, body);

export const getUser = (url: string) => GET(url);
