import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const MainContentNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 grid-rows-1 border-b border-twitterOutliner h-13 w-full">
      <button className=" hover:bg-amber-300">
        For You
      </button>
      <button className=" hover:bg-amber-300">
        Following
      </button>
    </div>
  );
};

export default MainContentNavbar;
