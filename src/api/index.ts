import axios from "axios";

interface fetchWrapProps {
  method: "get" | "post" | "put" | "delete";
  url: string;
  body?: {};
}

const fetchWrap = async ({ method, url, body }: fetchWrapProps) => {
  const token = localStorage.getItem("token");
  try {
    const config = {
      baseURL: "https://api.realworld.io/api",
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    };
    const { data } =
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "put" && (await axios.patch(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      {};
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export const GET = (url: string) => fetchWrap({ method: "get", url });

export const POST = (url: string, body?: {}) =>
  fetchWrap({ method: "post", url, body });

export const PUT = (url: string, body?: {}) =>
  fetchWrap({ method: "put", url, body });

export const DELETE = (url: string) => fetchWrap({ method: "delete", url });
