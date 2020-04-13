import { User } from "./user";

export class Comment{
  comment_id: number;
  comment: String;
  date: Date;
  edited_at: Date;
  author: User;
}
