import { SERVER_URL } from "../util/config";
import { AddReplyParams, EditReplyParams } from "../replies/Replies.interfaces";

export const addReply = async ({ data, postId }: AddReplyParams) => {
  const res = await fetch(`${SERVER_URL}/replies/${postId}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const editReply = async ({ data, replyId }: EditReplyParams) => {
const res = await fetch(`${SERVER_URL}/replies/${replyId}`, {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log(res.body)
  return res.json();
};

