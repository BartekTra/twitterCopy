// App.js
import { Routes, Route } from "react-router-dom";
import LoginPage from "./AuthenticationComponents/LoginPage";
import RegisterPage from "./AuthenticationComponents/RegisterPage";
import MainPage from "./MainPage";
import TweetDetails from "./MainContent/MainContentComponents/MainFeedComponents.tsx/TweetDetails";
const RouterComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<TweetDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default RouterComponent;
