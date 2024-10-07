export type PostProps = {
	title: string
	message: string
	files: string[]
	link: string
}

export interface Post {
	post_id: string
	profile_name: string
	title: string
	message: string
	createdAt: string
	files: string[]
}

export interface PostForm {
	message: string
	title: string
	files: FileList
}

export interface PostImageCarouselProps {
	images: string[]
	link: string
}
