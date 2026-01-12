import React, { useState, type FormEvent } from 'react';
import api from '../api/axios.ts';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/sign_in', {
        email,
        password
      });

      console.log("Zalogowano!", response.data);

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