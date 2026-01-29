import React, { useState, useRef, type ChangeEvent, useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import { Image, Smile } from "lucide-react";
import TweetButton from "./MainFeedComponents.tsx/TweetButtons";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import ImagePreview from "./NewPostFormComponents/ImagePreview";
import { useImageUpload } from "./NewPostFormComponents/useImageUpload";
import type { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes";

const NewPostForm: React.FC = () => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user, loading } = useUser();
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const {
    selectedImages,
    fileInputRef,
    handleImageButtonClick,
    handleFileChange,
    removeImage,
  } = useImageUpload();

  if (loading) return <p>Loading...</p>;

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustHeight();
  };

  const onEmojiClick = (emojiData: EmojiClickData): void => {
    setText(text.concat(emojiData.emoji));
    setShowPicker(false);
  };

  return (
    <div className="border-twitterOutliner flex flex-row gap-3 border-b px-4">
      <div className="py-3">
        <img
          src={user?.avatar_url || ""}
          className="outline-twitterOutliner h-12 min-h-12 w-12 min-w-12 rounded-full object-cover outline"
          alt="Avatar"
        />
      </div>

      <div className="flex-1 py-3">
        <textarea
          ref={textareaRef}
          rows={1}
          className="peer w-full resize-none overflow-hidden bg-transparent py-2 text-xl text-white placeholder-gray-500 outline-none focus:ring-0"
          placeholder="What's happening?!"
          value={text}
          onChange={handleInput}
        />

        <ImagePreview images={selectedImages} onRemove={removeImage} />

        <div className="peer-focus:border-twitterOutliner mt-2 flex flex-row items-center justify-between border-t border-transparent pt-2">
          <div className="flex gap-1">
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
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
              <div ref={emojiPickerRef}
              style={{ position: "absolute", zIndex: 10, top: "170px" }}>
                <EmojiPicker
                  emojiStyle={EmojiStyle.NATIVE}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}
          </div>
          <div className="place-content-end">
            <button
              disabled={!text.trim() && selectedImages.length === 0}
              className={`rounded-full px-4 py-1.5 font-bold transition-colors duration-200 ${
                text.trim() || selectedImages.length > 0
                  ? "bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]"
                  : "cursor-default bg-[#0f4e78] text-gray-400 opacity-50"
              }`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
