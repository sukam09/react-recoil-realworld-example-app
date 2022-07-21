export interface UserProps {
  email: string;
  password?: string;
  username?: string;
  bio?: string;
  image?: string;
  token?: string;
}

export interface BodyProps {
  user: UserProps;
}

export interface HeaderProps {
  Authorization: string;
}

// export interface ConfigProps {
//   headers: HeaderProps;
// }

// export interface ErrorProps {
//   email: string;
//   password: string;
//   username?: string;
//   emailOrPassword?: string;
// }
