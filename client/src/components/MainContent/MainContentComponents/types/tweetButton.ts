import type { ReactNode } from "react";

export interface TweetButton{
  content: ReactNode;
  action: () => void;
}