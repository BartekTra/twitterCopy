import type { ReactNode } from "react";

export interface TweetButton {
  content: ReactNode;
  action: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}
