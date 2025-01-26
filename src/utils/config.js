export const BACKEND_URL =
  location.hostname === "localhost" ? import.meta.env.VITE_BACKEND_URL : "/api";
