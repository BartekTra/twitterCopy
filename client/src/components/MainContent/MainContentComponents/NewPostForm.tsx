import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { Image, SquarePlay, Smile } from "lucide-react";
import TweetButton from "./MainFeedComponents.tsx/TweetButtons";

const handleNothing = () => {
  console.log("Nothing");
};

const NewPostForm = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const { text, setText } = useState<String>("");
  if (loading) return <p>XD</p>;
  useEffect(() => {
    console.log(user?.avatar_url);
    console.log(user?.id);
  }, [user]);
  return (
    <div className="border-twitterOutliner flex min-h-30 flex-row border-b px-4">
      <div className="py-3">
        <img
          src={user?.avatar_url}
          className="outline-twitterOutliner h-12 min-h-12 w-12 min-w-12 rounded-full outline"
        ></img>
      </div>
      <div className="flex-1 py-3">
        <div className="h-13 place-content-center items-center justify-center text-center">
          <textarea
            className="min-h-[50px] w-full resize-none border-none bg-transparent py-2 text-xl text-white placeholder-gray-500 outline-none focus:ring-0"
            placeholder="What's happening?!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex h-12 w-full flex-1 flex-row justify-between">
          <div className="grid grid-cols-3 place-content-end gap-3">
            <TweetButton Icon={Image} color="blue" action={handleNothing} />
            <TweetButton
              Icon={SquarePlay}
              color="blue"
              action={handleNothing}
            />
            <TweetButton Icon={Smile} color="blue" action={handleNothing} />
          </div>
          <div className="place-content-end">
            <button className="text-twitterDarkBackgroud font-chirp h-9 w-16 rounded-full bg-[#797b7b] font-bold">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
