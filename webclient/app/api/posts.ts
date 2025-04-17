import type { PostForm } from '../routes/posts/Posts.interfaces'
import { SERVER_URL } from '../util/config'

export const getPostById = async (postId: string) => {
	const res = await fetch(`${SERVER_URL}/posts/${postId}`)
	return res.json()
}

export const getPostReplies = async (postId: string) => {
	const res = await fetch(`${SERVER_URL}/replies/${postId}`)
	return res.json()
}

export const getPosts = async (subtopicId: string) => {
	const res = await fetch(`${SERVER_URL}/posts/subtopic/${subtopicId}`)
	return res.json()
}

interface AddPostParams {
	post: PostForm
	subtopicId: number
}
export const addPost = async ({ post, subtopicId }: AddPostParams) => {
	const formData = new FormData()

	formData.append('title', post.title)
	formData.append('message', post.message)

	// Append the files to the FormData object
	for (const file of post.files) {
		formData.append('files', file, file.name)
	}
	const res = await fetch(`${SERVER_URL}/posts/${subtopicId}`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		body: formData,
	})
	return res.json()
}
