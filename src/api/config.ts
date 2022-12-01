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
      (method === "put" && (await axios.put(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      {};
    return data;
  } catch (err: any) {
    // TODO: api common error handling may be deleted
    // if (err.response.status === 401 || err.response.status === 404) {
    //   // temporarily deactivate forced logout
    //   // TODO: change to use custom function acting like react
    //   // localStorage.removeItem("token");
    //   // window.location.replace("/#/");
    // }
    throw err;
  }
};

export const GET = (url: string) => fetchWrap({ method: "get", url });

export const POST = (url: string, body?: {}) =>
  fetchWrap({ method: "post", url, body });

export const PUT = (url: string, body?: {}) =>
  fetchWrap({ method: "put", url, body });

export const DELETE = (url: string) => fetchWrap({ method: "delete", url });
