
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Tweet } from "./types/tweet";
import api from "../../../api/axios";
import TweetRendering from "./Partials/TweetRendering";

const MainFeed = () => {
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
        <TweetRendering key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default MainFeed;
