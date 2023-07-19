export interface Token {
  access_token: string | null;
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  img: string;
}
export interface AuthenticatedUser extends Token {
  user: User | null;
}
