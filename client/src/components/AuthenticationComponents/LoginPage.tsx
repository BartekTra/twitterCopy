import { useState, type FormEvent } from "react";
import api from "../../api/axios.ts";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.tsx";
const LoginPage = () => {
  const [email, setEmail] = useState<string>("test@example.com");
  const [password, setPassword] = useState<string>("password");
  const navigate = useNavigate();
  const { refetchUser } = useUser();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      api.post("/auth/sign_in", {
        email,
        password,
      });
      refetchUser();
    } catch (error) {
      console.error("Błąd logowania", error);
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/register")}>XD</button>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
        />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default LoginPage;
