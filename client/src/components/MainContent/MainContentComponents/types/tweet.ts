import type { User } from "./user";

export interface Tweet{
  id: number;
  user_id: number;
  content: string;
  parent_tweet_id: number | null;
  likes_count: number;
  retweets_count: number;
  created_at: string;
  updated_at: string;
  user: User;
}
