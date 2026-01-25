import React, { useState, type FormEvent } from "react";
import api from "../api/axios.ts";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
const MainPage = () => {
  const { user } = useUser();

  if (!user) return <p>loading</p>;
  const entries = Object.entries(user);
  return (
    <div>

      <p>{user.uid}</p>
    </div>
  );
};

export default MainPage;
