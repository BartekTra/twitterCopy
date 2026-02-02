import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Tweet } from "../types/tweet";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  X,
} from "lucide-react";
import TweetButton from "./TweetButtons";

const handleHeartButton = () => console.log("Heart");
const handleCommentButton = () => console.log("Comment");
const handleRetweetButton = () => console.log("Retweet");

const TweetTemplate = ({ tweet }: { tweet: Tweet }) => {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const handleTweetClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("video") ||
      target.closest("img")
    ) {
      return;
    }
    navigate(`/${tweet.id}`);
  };

  const openModal = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMedia(url);
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedMedia(null);
  };

  const isVideo = (url: string | null) => {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
  };

  const renderAttachments = (urls: string[]) => {
    if (!urls || urls.length === 0) return null;

    const count = urls.length;
    let gridClass = "";
    const mediaClass =
      "h-full w-full object-cover bg-black cursor-pointer hover:opacity-90 transition-opacity";

    switch (count) {
      case 1:
        gridClass = "grid-cols-1";
        break;
      case 2:
        gridClass = "grid-cols-2";
        break;
      case 3:
        gridClass = "grid-cols-2 grid-rows-2";
        break;
      case 4:
        gridClass = "grid-cols-2 grid-rows-2";
        break;
      default:
        gridClass = "grid-cols-1";
    }

    return (
      <div
        className={`mt-3 grid h-72 gap-0.5 overflow-hidden rounded-2xl ${gridClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {urls.map((url, index) => {
          let spanClass = "";
          if (count === 3 && index === 0) {
            spanClass = "row-span-2";
          }

          return (
            <div key={url} className={`relative ${spanClass}`}>
              {isVideo(url) ? (
                <video
                  src={url}
                  preload="metadata"
                  className={mediaClass}
                  onClick={(e) => openModal(url, e)}
                >
                  Twoja przeglądarka nie obsługuje video.
                </video>
              ) : (
                <img
                  src={url}
                  alt={`Attachment ${index + 1}`}
                  className={mediaClass}
                  onClick={(e) => openModal(url, e)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="flex flex-1 cursor-pointer flex-row py-3"
      onClick={handleTweetClick}
    >
      <div className="pr-2">
        <img
          src={tweet.user.avatar_url}
          alt={tweet.user.display_name}
          className="outline-twitterOutliner h-12 w-12 rounded-full object-cover outline"
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-row items-center gap-1">
          <p className="text-twitterText font-bold">
            {tweet.user.display_name}
          </p>
          <p className="text-twitterDarkFont">@{tweet.user.nickname}</p>
          <span className="text-twitterDarkFont">·</span>
          <p className="text-twitterDarkFont text-sm">2h</p>
        </div>

        <div className="mt-1 mb-2">
          <p className="text-twitterText leading-normal">{tweet.content}</p>
        </div>

        {renderAttachments(tweet.attachments_urls)}

        <div className="-ml-2 flex w-full justify-between">
          <TweetButton
            Icon={MessageCircle}
            action={handleCommentButton}
            color="blue"
            counter={tweet.replies_counter}
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
            counter={tweet.likes_count}
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

        {selectedMedia && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={(e) => closeModal(e)}
          >
            <button
              onClick={(e) => closeModal(e)}
              className="absolute top-4 left-4 z-50 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
            >
              <X size={24} />
            </button>

            <div className="relative flex items-center justify-center">
              {isVideo(selectedMedia) ? (
                <video
                  src={selectedMedia}
                  controls
                  autoPlay
                  className="max-h-[90vh] max-w-[90vw] object-contain shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  Twoja przeglądarka nie obsługuje.
                </video>
              ) : (
                <img
                  src={selectedMedia}
                  alt="Full view"
                  className="max-h-[90vh] max-w-[90vw] object-contain shadow-lg select-none"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetTemplate;
