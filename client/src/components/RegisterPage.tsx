import React, { useState, type FormEvent } from "react";
import api from "../api/axios.ts";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth", {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      console.log("Zalogowano!", response.data);
    } catch (error) {
      console.error("Błąd logowania", error);
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/login")}>XD</button>

      <form onSubmit={handleSubmit}>
        <p> REJESTRACJA</p>
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
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Potwierdzenie hasła"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
