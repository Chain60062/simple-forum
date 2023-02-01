export type PostProps = {
  title: string;
  message: string;
  files: Array<string>;
  link: string;
}
export interface IPost {
  post_id: string;
  profile_name: string;
  title: string;
  message: string;
  createdAt: string;
  files: Array<string>;
}
