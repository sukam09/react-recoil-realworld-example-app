import api from "@/api";

export const getProfile = async (url: string) => {
  return await api.get(url);
};
