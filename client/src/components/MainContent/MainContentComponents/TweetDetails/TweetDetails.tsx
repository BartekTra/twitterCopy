import React, { useEffect, useState } from "react";
import type { Tweet } from "../types/tweet";
import api from "../../../../api/axios";
import { useParams } from "react-router-dom";


const TweetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tweetDetails, setTweetsDetails] = useState<Tweet | null>(null);

  useEffect(()=>{
    console.log(tweetDetails);
  }, [tweetDetails])

  useEffect(() => {
    const fetchTweetDetails = async () => {
      const response = await api.get(`/tweets/${id}`);
      setTweetsDetails(response.data);
      console.log(tweetDetails);
    };

    fetchTweetDetails();
  }, []);

  return (
    <div className="p-4">
      {/* <- POST */}
      <div className="mb-16">
        <button>
          - POST
        </button>
      </div>
      
      {/* Avatar + nickname + display_name */}
      <div className="flex flex-row">
        <div>
          <img 
          className="w-12 h-12"
          src={tweetDetails?.user.avatar_url}
          />
        </div>
        <div>
          <div>
            {tweetDetails?.user.display_name}
          </div>
          <div>
            {tweetDetails?.user.nickname}
          </div>
        </div>
      </div>

      {/* TRESC */}
      <div>

      </div>

      {/* DATA */}

    <div>

    </div>

    {/* IKONKI */}
    <div>

    </div>


    </div>
  );
};

export default TweetDetails;
