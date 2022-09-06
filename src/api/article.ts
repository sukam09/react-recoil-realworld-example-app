import { GET, POST } from "@api/config";

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
