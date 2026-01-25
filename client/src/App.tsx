import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./components/RouterComponent";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <RouterComponent />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
