import type { LoaderFunctionArgs } from 'react-router-dom'
import type { RegisterForm } from '../pages/register/Register.interfaces'
import { SERVER_URL } from '../util/config'

export const userExists = async ({ params }: LoaderFunctionArgs) => {
	const user = await fetch(`${SERVER_URL}/users/${params.username}`)
	if (user.status === 404) {
		throw new Response('Não Encontrado', { status: 404 })
	}
	return true
}

export const addUser = async (data: RegisterForm) => {
	const res = await fetch(`${SERVER_URL}/users`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	return res
}

export const getUser = async (username: string) => {
	const res = await fetch(`${SERVER_URL}/users/${username}`)
	return res.json()
}

export const getUserImage = async (avatar: string) => {
	const res = await fetch(`${SERVER_URL}/${avatar}`)
	const imageBlob = await res.blob()
	return URL.createObjectURL(imageBlob)
}
