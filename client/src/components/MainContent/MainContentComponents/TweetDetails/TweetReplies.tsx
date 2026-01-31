import React from "react";
import type { Tweet } from "../types/tweet";
import type { User } from "../types/user"; // Załóżmy, że masz taki typ
import TweetButton from "../MainFeedComponents.tsx/TweetButtons";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import TweetTemplate from "../MainFeedComponents.tsx/TweetTemplate";
import TweetRendering from "../Partials/TweetRendering";

interface TweetDetailsProps {
  tweet: Tweet;
  currentUser: User | null;
}

const TweetReplies = ({ tweet, currentUser }: TweetDetailsProps) => {
  const navigate = useNavigate();

  const isoDate = tweet.created_at;
  if (!isoDate) return <p> xd </p>;

  return (
    <div className="border-twitterOutliner h-999 border-t-0">
      <TweetRendering tweet={tweet}/>
    </div>
  );
};

export default TweetReplies;
