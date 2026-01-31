import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import { useUser } from "../../../../context/UserContext";
import { ArrowLeft } from "lucide-react";
import TweetButton from "../MainFeedComponents.tsx/TweetButtons";

// Importuj komponenty podrzędne
import TweetDetails from "./TweetDetails";
import type { Tweet } from "../types/tweet";
import TweetReplies from "./TweetReplies";
import TweetAncestors from "./TweetAncestors";
import TweetRendering from "../Partials/TweetRendering";
import TweetTemplate from "../MainFeedComponents.tsx/TweetTemplate";

const TweetContainerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const [tweetDetails, setTweetDetails] = useState<Tweet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pobieranie danych
  useEffect(() => {
    const fetchTweetDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/tweets/${id}`);
        setTweetDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch tweet", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchTweetDetails();
  }, [id]);

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (!tweetDetails)
    return <div className="p-4 text-center">Tweet not found</div>;

  return (
    <div className="min-h-screen w-full">
      <div onClick={() => navigate(-1)} className="flex h-13 cursor-pointer">
        <div className="flex w-14 cursor-pointer items-center text-center">
          <TweetButton
            Icon={ArrowLeft}
            action={() => navigate(-1)}
            color="white"
          />
        </div>

        <div className="flex cursor-pointer items-center">
          <span className="font-chirp font-bold">POST</span>
        </div>
      </div>

      {/* KOMPONENT GŁÓWNEGO TWEETA */}
      {tweetDetails?.ancestors.map((tweet) => (
        <div key={tweet.id} className="relative p-3">
          <TweetAncestors
            key={tweet.id}
            tweet={tweet}
            currentUser={tweet.user}
          />
          <div className="pointer-events-none absolute top-[5rem] bottom-[-10px] left-[34px] -z-0 w-0.5 bg-[#333639]"></div>
        </div>
      ))}


      <TweetDetails tweet={tweetDetails} currentUser={user} />

      {tweetDetails?.replies.map((tweet) => (
        <TweetRendering key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetContainerDetails;
