export interface AuthProps {
  username?: string;
  email: string;
  password: string;
}

export interface UserProps {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

export interface ProfileProps {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ArticlePreviewProps {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileProps;
}

export interface ArticleProps extends ArticlePreviewProps {
  body: string;
  updatedAt?: string;
}

export interface CommentProps {
  id?: number;
  createdAt: string;
  body: string;
  author: ProfileProps;
}
