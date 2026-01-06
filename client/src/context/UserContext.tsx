// Np. w App.js lub AuthContext.js
import { useEffect, useState } from "react";
import api from "../api/axios.tsx";

const App = () => {
  type User = {
    email: string;
  };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Zapytanie do endpointu walidacji.
        // Dzięki withCredentials: true, przeglądarka sama wyśle ciasteczko auth_cookie
        const response = await api.get("/auth/validate_token");
        console.log(response);
        setUser(response.data.data);
      } catch (error) {
        // Użytkownik nie jest zalogowany (401 Unauthorized)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>{user ? <h1>Witaj, {user.email}</h1> : <h1>Zaloguj się</h1>}</div>
  );
};
