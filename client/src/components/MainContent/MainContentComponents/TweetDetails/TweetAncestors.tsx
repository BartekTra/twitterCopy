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
import TweetDetails from "./TweetDetails";
import TweetTemplate from "../MainFeedComponents.tsx/TweetTemplate";

interface TweetAncestorsProps {
  tweet: Tweet;
  currentUser: User;
}

const TweetAncestors = ({ tweet, currentUser }: TweetAncestorsProps) => {
  // Logika przycisków (można ją też wynieść wyżej, ale tu jest ok dla UI)
  const handleHeartButton = () => console.log("Heart");
  const handleCommentButton = () => console.log("Comment");
  const handleRetweetButton = () => console.log("Retweet");
  console.log(tweet);
  const navigate = useNavigate();


  return (
    <div className="relative">
        <TweetTemplate tweet={tweet}/>
    </div>
  );
};

export default TweetAncestors;
