import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import MainContentNavbar from "./MainContentComponents/MainContentNavbar";
import NewPostForm from "./MainContentComponents/NewPostForm";
import ShowNewPostsNotification from "./MainContentComponents/ShowNewPosts";
import MainFeed from "./MainContentComponents/MainFeed";

const MainContent = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  if(loading) return <p>Loading...</p>
  return (
    <div className="">
      <MainContentNavbar />
      <NewPostForm />
      <ShowNewPostsNotification />
      <MainFeed />
      <p> {user?.display_name} </p>
      <p> {user?.id} </p>
      <p> {user?.nickname} </p>
      <p> {user?.email} </p>
    </div>
  );
};

export default MainContent;
