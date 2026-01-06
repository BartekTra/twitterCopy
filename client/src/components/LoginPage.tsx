import React, { useState } from 'react';
import api from '../api/axios.ts';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      // Wysyłamy dane
      const response = await api.post('/auth/sign_in', {
        email,
        password
      });

      console.log("Zalogowano!", response.data);
      // Tutaj np. przekieruj użytkownika lub zaktualizuj Context
      // UWAGA: Nie musisz ręcznie zapisywać tokena! Przeglądarka już to zrobiła.

    } catch (error) {
      console.error("Błąd logowania", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Hasło" />
      <button type="submit">Zaloguj</button>
      <p> No teoretycznie to działa, ale nie jestem pewien</p>
    </form>
  );
};

export default LoginPage;