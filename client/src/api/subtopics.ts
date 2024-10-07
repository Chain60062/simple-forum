import type {
	AddSubtopicParams,
	SubtopicForm,
} from '../pages/subtopics/Subtopics.interfaces'
import { SERVER_URL } from '../util/config'

export const addSubtopic = async ({ subtopic, topicId }: AddSubtopicParams) => {
	const res = await fetch(`${SERVER_URL}/subtopics/${topicId}`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(subtopic),
	})
	return res.json()
}

export const getSubtopics = async (topicId: number | undefined) => {
	const res = await fetch(`${SERVER_URL}/subtopics/${topicId}`)
	return res.json()
}

export const deleteSubtopic = async (topicId: number) => {
	const res = await fetch(`${SERVER_URL}/subtopics/${topicId}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return res.json()
}

export const updateSubtopic = async (
	subtopic: SubtopicForm,
	subtopicId: number,
) => {
	const res = await fetch(`${SERVER_URL}/subtopics/${subtopicId}`, {
		method: 'PUT ',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(subtopic),
	})

	return res.json()
}
