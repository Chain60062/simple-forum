import type {
	AddReplyParams,
	EditReplyParams,
} from '../pages/replies/Replies.interfaces'
import { SERVER_URL } from '../util/config'

export const addReply = async ({ data, postId }: AddReplyParams) => {
	const res = await fetch(`${SERVER_URL}/replies/${postId}`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	return res.json()
}

export const editReply = async ({ data, replyId }: EditReplyParams) => {
	const res = await fetch(`${SERVER_URL}/replies/${replyId}`, {
		method: 'PATCH',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	return res.json()
}
