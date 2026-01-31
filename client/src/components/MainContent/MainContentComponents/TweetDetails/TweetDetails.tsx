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

interface TweetDetailsProps {
  tweet: Tweet;
  currentUser: User | null;
}

const TweetDetails = ({ tweet, currentUser }: TweetDetailsProps) => {
  // Logika przycisków (można ją też wynieść wyżej, ale tu jest ok dla UI)
  const handleHeartButton = () => console.log("Heart");
  const handleCommentButton = () => console.log("Comment");
  const handleRetweetButton = () => console.log("Retweet");
  console.log(tweet);
  const navigate = useNavigate();

  const isoDate = tweet.created_at;
  if (!isoDate) return <p> xd </p>;

  return (
    <div className="border-twitterOutliner border-b px-4">
      {/* <- POST */}

      {/* Avatar + nickname + display_name */}
      <div className="mt-4 mb-4 flex h-10 flex-row">
        <div className="mr-2 flex h-10 w-10.5 items-center justify-start">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={tweet.user.avatar_url}
            alt={tweet.user.display_name}
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-chirp font-bold">
            {tweet.user.display_name}
          </span>
          <span className="font-chirp text-twitterDarkFont font-extralight">
            @{tweet.user.nickname}
          </span>
        </div>
      </div>

      {/* TREŚĆ */}
      <div className="mb-2 text-xl">{tweet.content}</div>

      {/* DATA */}
      <div className="mb-2">
        <span className="font-chirp text-twitterDarkFont font-light">
          {format(new Date(isoDate), "d MMMM yyyy, HH:mm", { locale: pl })}
        </span>
      </div>

      {/* IKONKI AKCJI */}
      <div className="border-twitterOutliner -ml-2 flex w-full justify-between border-y py-1">
        <TweetButton
          Icon={MessageCircle}
          action={handleCommentButton}
          color="blue"
          counter={tweet.replies_counter}
        />
        <TweetButton
          Icon={Repeat2}
          action={handleRetweetButton}
          color="green"
          size={22}
          counter={0}
        />
        <TweetButton
          Icon={Heart}
          action={handleHeartButton}
          color="pink"
          counter={tweet.likes_count}
        />
        <div className="flex gap-1">
          <TweetButton
            Icon={Bookmark}
            action={handleHeartButton}
            color="blue"
          />
          <TweetButton Icon={Share} action={handleHeartButton} color="blue" />
        </div>
      </div>

      {/* INPUT ODPOWIEDZI (Reply Box) */}
      <div className="mt-2 flex h-21 flex-row items-center gap-2 pt-1 pb-3">
        <div className="flex items-center justify-center">
          <img
            src={currentUser?.avatar_url}
            className="h-10 w-10 rounded-full object-cover"
            alt="My Avatar"
          />
        </div>
        <textarea
          rows={1}
          className="flex-1 resize-none overflow-hidden bg-transparent text-xl text-white placeholder-gray-500 outline-none focus:ring-0"
          placeholder="Post your reply"
        />
        <button className="font-chirp text-twitterDarkBackgroud bg-twitterDarkFont hover:bg-opacity-90 h-9 w-21 rounded-full font-bold transition">
          Reply
        </button>
      </div>
    </div>
  );
};

export default TweetDetails;
