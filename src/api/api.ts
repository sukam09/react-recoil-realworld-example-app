import axios from "axios";

const api = axios.create({
  baseURL: "https://api.realworld.io/api",
});

export default api;
