import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/topics/Topics.tsx"),
  route(":topicId/subtopics", "routes/subtopics/Subtopics.tsx"),
  route("cadastro", "routes/register/Register.tsx"),
  route("login", "routes/login/Login.tsx"),
  route("profile/:username", "routes/profile/Profile.tsx"),
  route(
    ":topicId/subtopics/:subtopicId/posts/:postId",
    "routes/replies/Replies.tsx"
  ),
  route(":topicId/subtopics/:subtopicId/posts", "routes/posts/Posts.tsx")
] satisfies RouteConfig;
