export interface IUser {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
}
