export interface UserAccount {
	user_id: string
	user_name: string
	user_role: string
	profile_id: number
	email: string
	email_is_verified: true
	profile_name: string
	avatar: string
	created_at: string
}
export interface UserContextType {
	loggedUser?: UserAccount | null
	setLoggedUser: (loggedUser: UserAccount | null) => void
}
