export interface Reply {
	reply_id: string
	message: string
	parent_id?: string | null
	post_id: string
	user_name: string
	profile_name: string
	avatar: string
	user_id: string
}
export type ReplyForm = {
	message: string
}
export interface AddReplyParams {
	data: ReplyForm
	postId: string | undefined
}

export interface EditReplyParams {
	data: ReplyForm
	replyId: number | undefined
}
