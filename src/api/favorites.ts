import { POST, DELETE } from "./config";

export const postFavorites = (url: string) => POST(url);
export const deleteFavorites = (url: string) => DELETE(url);
