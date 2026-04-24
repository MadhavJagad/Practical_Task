import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000, // 10 s timeout
});

/* ── Request interceptor ─────────────────────────────────── */
api.interceptors.request.use(
  (config) => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch {
        // malformed JSON – ignore
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ── Response interceptor ────────────────────────────────── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  },
);

export default api;
