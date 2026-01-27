import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { type Tweet } from "../types/tweet";
import { MessageCircle, Repeat2, Heart, Bookmark, Share } from "lucide-react";
import TweetButton from "./TweetButtons";

const handleHeartButton = () => {
  return;
};

const handleCommentButton = () => {
  return;
};

const handleRetweetButton = () => {
  return;
};

const TweetTemplate = ({ tweet }: { tweet: Tweet }) => {
  const navigate = useNavigate();
  return (
    <div className="border-twitterOutliner min-h-min border-b px-4 font-[15px]">
      <div className="flex flex-1 flex-row py-3">
        <div className="pr-2">
          <img
            src={tweet.user.avatar_url}
            className="outline-twitterOutliner h-12.5 min-h-12.5 w-12.5 min-w-12.5 rounded-full outline"
          ></img>
        </div>
        <div className="flex-1">
          <div className="flex flex-row gap-1">
            <p className="font-chirp font-bold">{tweet.user.display_name}</p>
            <p className="font-chirp font-regular text-twitterDarkFont">
              @{tweet.user.nickname}
            </p>
          </div>
          <div>
            <p className="font-chirp font-regular">{tweet.content}</p>
          </div>
          <div className="flex-rows mt-3 flex w-full">
            <div className="grid w-full grid-cols-3 grid-rows-1">
              <TweetButton
                content={<MessageCircle size={18.75} className="rounded-full hover:bg-gray-400"/>}
                action={handleCommentButton}
              />
              <TweetButton
                content={<Repeat2 size={18.75} />}
                action={handleRetweetButton}
              />
              <TweetButton
                content={<Heart size={18.75} />}
                action={handleHeartButton}
              />
            </div>
            <div className="flex place-items-end justify-end gap-2">
              <TweetButton
                content={<Bookmark size={18.75} />}
                action={handleHeartButton}
              />
              <TweetButton
                content={<Share size={18.75} />}
                action={handleHeartButton}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetTemplate;
