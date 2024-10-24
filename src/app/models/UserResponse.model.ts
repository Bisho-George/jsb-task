import { User } from "./User.model";

export interface UserResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}
