export interface UserProps {
  email: string;
  password?: string;
  username?: string;
  bio?: string;
  image?: string;
  token?: string;
  following?: boolean;
}

export interface ArticleProps {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  author?: UserProps;
}

export interface UserDataProps {
  user: UserProps;
}

export interface ArticleDataProps {
  article: ArticleProps;
}
