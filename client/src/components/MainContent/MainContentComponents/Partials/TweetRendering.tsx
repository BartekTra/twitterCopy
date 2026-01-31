import TweetTemplate from "../MainFeedComponents.tsx/TweetTemplate";
import type { Tweet } from "../types/tweet";
import { useNavigate } from "react-router-dom";

interface TweetRenderingProps {
  tweet: Tweet;
}

const TweetRendering = ({ tweet }: TweetRenderingProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        key={tweet.id}
        className="border-twitterOutliner hover:bg-twitterTweetHoverBackground cursor-pointer border-b px-4 font-[15px] transition-colors"
      >
        <TweetTemplate tweet={tweet} />
      </div>
    </div>
  );
};

export default TweetRendering;
