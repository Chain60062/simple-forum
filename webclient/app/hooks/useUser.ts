import { useQuery } from '@tanstack/react-query'
import { getLoggedInUser } from '../api/auth'

export const useUser = () =>
	useQuery({ queryKey: ['user'], queryFn: getLoggedInUser })
