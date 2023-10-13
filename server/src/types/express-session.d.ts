import { User } from "../users/users.interfaces";

declare module 'express-session' {
  interface SessionData {
    user?: User;
  }
}

