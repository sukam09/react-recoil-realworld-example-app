import { GET, POST } from "@/api";

export const postComments = (
  url: string,
  body: { comment: { body: string } }
) => POST(url, body);

export const getComments = (url: string) => GET(url);
