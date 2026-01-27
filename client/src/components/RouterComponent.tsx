// App.js
import { Routes, Route } from "react-router-dom";
import LoginPage from "./AuthenticationComponents/LoginPage";
import RegisterPage from "./AuthenticationComponents/RegisterPage";
import MainPage from "./MainPage";
const RouterComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default RouterComponent;
