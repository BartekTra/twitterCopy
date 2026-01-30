import React, { useEffect, useState } from "react";
import type { Tweet } from "../types/tweet";
import api from "../../../../api/axios";
import { Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TweetButton from "../MainFeedComponents.tsx/TweetButtons";
import TweetActions from "../MainFeedComponents.tsx/TweetActions";
import { MessageCircle, Repeat2, Heart, Bookmark, Share } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useUser } from "../../../../context/UserContext";

const TweetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tweetDetails, setTweetsDetails] = useState<Tweet | null>(null);
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const handleHeartButton = () => console.log("Heart");
  const handleCommentButton = () => console.log("Comment");
  const handleRetweetButton = () => console.log("Retweet");

  useEffect(() => {
    console.log(tweetDetails);
  }, [tweetDetails]);

  useEffect(() => {
    const fetchTweetDetails = async () => {
      const response = await api.get(`/tweets/${id}`);
      setTweetsDetails(response.data);
      console.log(tweetDetails);
    };

    fetchTweetDetails();
  }, []);

  const isoDate: string | undefined = tweetDetails?.created_at;
  if (!isoDate) return <span> Loading </span>;

  return (
    <div className="px-4 border-b border-twitterOutliner">
      {/* <- POST */}
      <div onClick={() => navigate("/")} className="flex h-13 cursor-pointer">
        <button className="flex cursor-pointer flex-row">
          <div className="flex w-14 cursor-pointer items-center text-center">
            <TweetButton
              Icon={ArrowLeft}
              action={() => navigate("/")}
              color="white"
            />
          </div>
          <div className="flex cursor-pointer items-center">
            <span className="font-chirp font-bold">POST</span>
          </div>
        </button>
      </div>

      {/* Avatar + nickname + display_name */}
      <div className="mb-4 flex h-10 flex-row">
        <div className="mr-2 flex h-10 w-10.5 items-center justify-start">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={tweetDetails?.user.avatar_url}
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-chirp font-bold">
            {tweetDetails?.user.display_name}
          </span>

          <span className="font-chirp text-twitterDarkFont font-extralight">
            @{tweetDetails?.user.nickname}
          </span>
        </div>
      </div>

      {/* TRESC */}
      <div className="mb-2">{tweetDetails?.content}</div>

      {/* DATA */}

      <div className="mb-2">
        <span className="font-chirp text-twitterDarkFont font-light">
          {format(new Date(isoDate), "d MMMM yyyy, HH:mm", { locale: pl })}
        </span>
      </div>

      {/* IKONKI */}

      <div className="border-twitterOutliner -ml-2 flex w-full justify-between border-y">
        <TweetButton
          Icon={MessageCircle}
          action={handleCommentButton}
          color="blue"
          counter={tweetDetails?.replies_counter}
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
          counter={tweetDetails?.likes_count}
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

      <div className="flex flex-row items-center gap-2 pt-1 pb-3 h-21">
        <div className="flex items-center justify-center">
          <img 
          src={user?.avatar_url}
          className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <textarea
          //ref={}
          rows={1}
          className="flex-1 resize-none overflow-hidden bg-transparent text-xl text-white placeholder-gray-500 outline-none focus:ring-0"
          placeholder="Post your reply"
          //value={text}
          //onChange={handleInput}
        />
        <button
          className="w-21 h-9 font-chirp font-bold text-twitterDarkBackgroud bg-twitterDarkFont rounded-full"
        >
          Reply
        </button>
      </div>

    </div>
  );
};

export default TweetDetails;
