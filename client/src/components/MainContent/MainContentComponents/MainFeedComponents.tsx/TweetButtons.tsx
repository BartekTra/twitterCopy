
import { type TweetButton } from "../types/tweetButton";


const TweetButton = ({ content, action }: TweetButton ) => {
  return (
    <button
    onClick={action}
    className=""
    >
      {content}
    </button>
  )
}

export default TweetButton;