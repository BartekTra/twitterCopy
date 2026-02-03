
import type { Tweet } from "../types/tweet";
import type { User } from "../types/user";

import TweetRendering from "../Partials/TweetRendering";

interface TweetDetailsProps {
  tweet: Tweet;
  currentUser: User | null;
}

const TweetReplies = ({ tweet, currentUser }: TweetDetailsProps) => {

  const isoDate = tweet.created_at;
  if (!isoDate) return <p> xd </p>;

  return (
    <div className="border-twitterOutliner h-999 border-t-0">
      <TweetRendering tweet={tweet}/>
    </div>
  );
};

export default TweetReplies;
