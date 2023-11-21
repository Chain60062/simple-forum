export interface ITopic {
  topic_id: number;
  topic_name: string;
  description: string;
}
export interface TopicForm {
  topic_name: string;
  description: string;
}
export interface AdminTopicsProps{
  topics: Array<ITopic>
}
export interface EditTopicParams {
  topic: TopicForm;
  topicId: number;
}