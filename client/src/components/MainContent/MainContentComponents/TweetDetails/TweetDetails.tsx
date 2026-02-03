import { useRef, useState, type ChangeEvent } from "react";
import type { Tweet } from "../types/tweet";
import type { User } from "../types/user";
import TweetButton from "../MainFeedComponents.tsx/TweetButtons";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  Image,
  Smile,
} from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import axios from "../../../../api/axios";
import { useImageUpload } from "../NewPostFormComponents/useImageUpload";

import ImagePreview from "../NewPostFormComponents/ImagePreview";
import EmojiPicker, {
  EmojiStyle,
  type EmojiClickData,
} from "emoji-picker-react";

interface TweetDetailsProps {
  tweet: Tweet;
  currentUser: User | null;
}

const TweetDetails = ({ tweet, currentUser }: TweetDetailsProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  // Destrukturyzacja hooka do obrazków (dodano clearImages)
  const {
    selectedImages,
    selectedFiles,
    fileInputRef,
    handleImageButtonClick,
    handleFileChange,
    removeImage,
    clearImages, 
  } = useImageUpload();

  const handleHeartButton = () => console.log("Heart");
  const handleCommentButton = () => console.log("Comment");
  const handleRetweetButton = () => console.log("Retweet");

  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isoDate = tweet.created_at;

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData): void => {
    setReplyContent(replyContent.concat(emojiData.emoji));
    setShowPicker(false);
  };

  const isButtonDisabled = (!replyContent.trim() && selectedFiles.length === 0) || isSubmitting;

  const handleReplySubmit = async () => {
    if (isButtonDisabled) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      formData.append("tweet[content]", replyContent);
      formData.append("tweet[parent_tweet_id]", tweet.id.toString());

      selectedFiles.forEach((file) => {
        formData.append("tweet[attachments][]", file);
      });

      const response = await axios.post("/tweets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Dodano komentarz:", response.data);

      setReplyContent("");
      clearImages();
      setShowPicker(false);
      
      window.location.reload(); 
    } catch (error) {
      console.error("Błąd podczas dodawania odpowiedzi:", error);
      alert("Nie udało się dodać odpowiedzi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isoDate) return <p> xd </p>;

  return (
    <div className="border-twitterOutliner border-b px-4">

      <div className="mt-4 mb-4 flex h-10 flex-row">
        <div className="mr-2 flex h-10 w-10.5 items-center justify-start">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={tweet.user.avatar_url}
            alt={tweet.user.display_name}
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-chirp font-bold">
            {tweet.user.display_name}
          </span>
          <span className="font-chirp text-twitterDarkFont font-extralight">
            @{tweet.user.nickname}
          </span>
        </div>
      </div>

      <div className="mb-2 text-xl">{tweet.content}</div>

      <div className="mb-2">
        <span className="font-chirp text-twitterDarkFont font-light">
          {format(new Date(isoDate), "d MMMM yyyy, HH:mm", { locale: pl })}
        </span>
      </div>

      <div className="border-twitterOutliner -ml-2 flex w-full justify-between border-y py-1">
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


      <div className="mt-2 flex min-h-21 flex-row gap-2 pt-1 pb-3">
        <div className="flex items-start">
          <img
            src={currentUser?.avatar_url}
            className="h-10 w-10 rounded-full object-cover"
            alt="My Avatar"
          />
        </div>
        <div className="flex w-full flex-col">
          <textarea
            rows={1}
            ref={textareaRef}
            className="w-full resize-none overflow-hidden bg-transparent text-xl text-white placeholder-gray-500 outline-none focus:ring-0"
            placeholder="Post your reply"
            value={replyContent}
            onChange={handleInput}
            disabled={isSubmitting}
          />


          <ImagePreview images={selectedImages} onRemove={removeImage} />
        </div>
      </div>

      <div className="mb-4 flex-1 flex flex-row pl-10">
        <input
          type="file"
          multiple
          accept="image/*, video/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={isSubmitting || selectedFiles.length >= 4}
        />
        <TweetButton
          Icon={Image}
          color="blue"
          action={handleImageButtonClick}
        />
        <TweetButton
          Icon={Smile}
          color="blue"
          action={() => setShowPicker(true)}
        />
        {showPicker && (
          <div
            ref={emojiPickerRef}
            style={{ position: "absolute", zIndex: 10, top: "170px" }}
          >
            <EmojiPicker
              emojiStyle={EmojiStyle.NATIVE}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
        

        <button
          onClick={handleReplySubmit}
          disabled={isButtonDisabled}
          className={`font-chirp ml-auto h-9 w-21 rounded-full font-bold transition ${
            isButtonDisabled
              ? "cursor-default bg-[#0f4e78] text-gray-500"
              : "bg-twitterDarkFont text-twitterDarkBackgroud hover:bg-opacity-90"
          }`}
        >
          {isSubmitting ? "..." : "Reply"}
        </button>
      </div>
    </div>
  );
};

export default TweetDetails;