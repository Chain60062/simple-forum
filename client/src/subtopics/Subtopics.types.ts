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
