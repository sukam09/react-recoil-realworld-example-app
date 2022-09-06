import { GET, POST } from "@api/config";

export const postComments = (
  url: string,
  body: { comment: { body: string } }
) => POST(url, body);

export const getComments = (url: string) => GET(url);
