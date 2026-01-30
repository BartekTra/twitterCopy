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
    <div 
    onClick={() => navigate(`/${tweet.id}`)}
    className="border-twitterOutliner hover:bg-twitterTweetHoverBackground cursor-pointer border-b px-4 font-[15px] transition-colors">
      <div className="flex flex-1 flex-row py-3">
        <div className="pr-2">
          <img
            src={tweet.user.avatar_url}
            alt={tweet.user.display_name}
            className="outline-twitterOutliner h-12 w-12 rounded-full object-cover outline"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-row items-center gap-1">
            <p className="text-twitterText font-bold">
              {tweet.user.display_name}
            </p>
            <p className="text-twitterDarkFont">@{tweet.user.nickname}</p>
            <span className="text-twitterDarkFont">·</span>
            <p className="text-twitterDarkFont text-sm">2h</p>
          </div>

          <div className="mt-1 mb-2">
            <p className="text-twitterText leading-normal">{tweet.content}</p>
          </div>

          <div className="-ml-2 flex w-full max-w-md justify-between">
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
