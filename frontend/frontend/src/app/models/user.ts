import { ROLE } from "../enums/role";

export class User {
  id: number;
  auth0: String;
  email: String;
  username: String;
  description: String;
  created_at: Date;
  updated_at: Date;
  role: ROLE;
  avatar_url: String;
  avatar: Avatar;
}
 class Avatar{
    link: string;
 }