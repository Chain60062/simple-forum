export interface IUser {
  user_name: string;
  user_role: string;
  email: string;
  profile_name: string;
  avatar: string;
  password: string;
}
export type UserForm = {
  user_name: string;
  profile_name: string;
  email: string;
  password: string;
  password_confirm: string;
};
export interface IProfile {
  profile_name: string;
  avatar: string;
}