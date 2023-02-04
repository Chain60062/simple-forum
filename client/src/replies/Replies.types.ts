export interface IReply {
  reply_id: string;
  message: string;
  parent_id?: string | null;
  post_id: string;
  nickname: string;
  profile_name: string;
  avatar: string;
}
export type ReplyForm = {
  message: string;
}