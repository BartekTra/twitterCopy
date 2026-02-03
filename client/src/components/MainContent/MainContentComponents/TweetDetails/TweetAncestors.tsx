
import type { Tweet } from "../types/tweet";
import type { User } from "../types/user";
import TweetTemplate from "../MainFeedComponents.tsx/TweetTemplate";

interface TweetAncestorsProps {
  tweet: Tweet;
  currentUser: User;
}

const TweetAncestors = ({ tweet, currentUser }: TweetAncestorsProps) => {
  console.log(tweet);


  return (
    <div className="relative">
        <TweetTemplate tweet={tweet}/>
    </div>
  );
};

export default TweetAncestors;
