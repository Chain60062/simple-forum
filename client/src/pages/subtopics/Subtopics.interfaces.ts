export interface Subtopic {
	subtopic_id: number
	subtopic_name: string
	description: string
}
//
export type SubtopicForm = {
	subtopic_name: string
	description: string
}
export type SubtopicProps = {
	topicId: string
}

export interface AdminSubtopicsProps {
	subtopics: Array<Subtopic>
}

export interface AddSubtopicParams {
	subtopic: SubtopicForm
	topicId: number
}
