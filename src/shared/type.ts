export interface LoginUserProps {
  username?: string;
  email: string;
  password: string;
}

export interface UserProps extends LoginUserProps {
  bio: string;
  image: string;
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
