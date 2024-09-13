import type { EditTopicParams, ITopic } from '../topics/Topics.interfaces'
import { SERVER_URL } from '../util/config'

export const addTopic = async (data: ITopic) => {
	const res = await fetch(`${SERVER_URL}/topics`, {
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

export const getTopics = async () => {
	const res = await fetch(`${SERVER_URL}/topics`, {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res?.ok) {
		throw new Error('Erro inesperado na requisição.')
	}

	return res.json()
}

export const deleteTopic = async (topicId: number) => {
	const res = await fetch(`${SERVER_URL}/topics/${topicId}`, {
		method: 'DELETE',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res?.ok) {
		throw new Error('Erro inesperado na requisição.')
	}

	return res.json()
}

export const updateTopic = async ({ topic, topicId }: EditTopicParams) => {
	const res = await fetch(`${SERVER_URL}/topics/${topicId}`, {
		method: 'PUT ',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(topic),
	})

	if (!res?.ok) {
		throw new Error('Erro inesperado na requisição.')
	}

	return res.json()
}
