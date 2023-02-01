export interface IUser {
  profile_name: string;
  profile_role: string;
  email: string;
  nickname: string;
  avatar: string;
  password: string;
}
export type UserForm = {
  profile_name: string;
  email: string;
  nickname: string;
  password: string;
  password_confirm: string;
};
