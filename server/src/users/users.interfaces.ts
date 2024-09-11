export interface UserRequestObject {
	user_name: string
	profile_name: string
	password: string
	email: string
	avatar: Express.Multer.File
}

export interface User {
	user_id: string
	profile_id: string
	profile_name: string
	password: string
	nickname: string
	email: string
}

export interface RegisterUser {
	user_name: string
	profile_name: string
	password: string
	email: string
}
