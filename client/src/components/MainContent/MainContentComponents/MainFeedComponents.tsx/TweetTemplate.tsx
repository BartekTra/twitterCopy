import React from "react";
import { useNavigate } from "react-router-dom";
import { type Tweet } from "../types/tweet";
import { MessageCircle, Repeat2, Heart, Bookmark, Share } from "lucide-react";
import TweetButton from "./TweetButtons";

// ... (Twoje funkcje handle... pozostają bez zmian)
const handleHeartButton = () => console.log("Heart");
const handleCommentButton = () => console.log("Comment");
const handleRetweetButton = () => console.log("Retweet");

const TweetTemplate = ({ tweet }: { tweet: Tweet }) => {
  const navigate = useNavigate();

  return (
    <div className="border-twitterOutliner hover:bg-twitterTweetHoverBackground 
    cursor-pointer border-b px-4 font-[15px] transition-colors">
      <div className="flex flex-1 flex-row py-3">
        {/* Avatar */}
        <div className="pr-2">
          <img
            src={tweet.user.avatar_url}
            alt={tweet.user.display_name}
            className="outline-twitterOutliner h-12 w-12 rounded-full object-cover outline"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-row items-center gap-1">
            <p className="font-bold text-twitterText">{tweet.user.display_name}</p>
            <p className="text-twitterDarkFont">@{tweet.user.nickname}</p>
            <span className="text-twitterDarkFont">·</span>
            <p className="text-sm text-twitterDarkFont">2h</p> {/* Przykładowa data */}
          </div>

          {/* Body */}
          <div className="mt-1 mb-2">
            <p className="leading-normal text-twitterText">{tweet.content}</p>
          </div>

          <div className="-ml-2 flex w-full max-w-md justify-between">
            <TweetButton
              Icon={MessageCircle}
              action={handleCommentButton}
              color="blue"
            />

            <TweetButton
              Icon={Repeat2}
              action={handleRetweetButton}
              color="green"
              size={22}
            />

            <TweetButton Icon={Heart} action={handleHeartButton} color="pink" />

            <div className="flex gap-1">
              <TweetButton
                Icon={Bookmark}
                action={handleHeartButton}
                color="blue"
              />
              <TweetButton
                Icon={Share}
                action={handleHeartButton}
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetTemplate;
