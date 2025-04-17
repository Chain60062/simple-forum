import type { ReactNode } from 'react'
export interface ListProps {
	title: string
	children: ReactNode
}

export interface CardProps {
	title: string
	description: string
	link: string
	children?: ReactNode
}
