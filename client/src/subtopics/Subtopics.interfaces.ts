export interface ISubtopic {
  subtopic_id: number;
  subtopic_name: string;
  description: string;
}
export type SubtopicForm = {
  subtopic_name: string;
  description: string;
};
export type SubtopicProps = {
  topicId: string;
}
export interface AdminSubtopicsProps {
  subtopics: Array<ISubtopic>;
}
export interface AddSubtopicParams {
  subtopic: SubtopicForm;
  topicId: number;
}