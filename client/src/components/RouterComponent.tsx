// App.js
import { Routes, Route } from "react-router-dom";
import LoginPage from "./AuthenticationComponents/LoginPage";
import RegisterPage from "./AuthenticationComponents/RegisterPage";
import MainPage from "./MainPage";
import TweetDetails from "./MainContent/MainContentComponents/TweetDetails/TweetDetails";
const RouterComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage tweetDetails={false} />} />
        <Route path="/:id" element={<MainPage tweetDetails={true} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default RouterComponent;
