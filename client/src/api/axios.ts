import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Adres twojego API
  withCredentials: true, // TO JEST NAJWAŻNIEJSZE - włącza przesyłanie ciasteczek
});

export default api;
