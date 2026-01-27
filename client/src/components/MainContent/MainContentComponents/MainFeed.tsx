import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { type Tweet } from "./types/tweet";
import api from "../../../api/axios";
import TweetTemplate from "./MainFeedComponents.tsx/TweetTemplate";

const MainFeed = () => {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState<Tweet[]>();

  useEffect(() => {
    console.log(tweets);
  }, [tweets]);

  useEffect(() => {
    async function getTweets() {
      const result = await api.get("/tweets");
      setTweets(result.data);
    }
    getTweets();
  }, []);

  return (
    <div className="border-twitterOutliner h-999 border-t-0">
      {tweets?.map((tweet) => (
        <TweetTemplate key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default MainFeed;
