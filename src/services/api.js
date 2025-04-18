import axios from "axios";

const primaryURL = "http://localhost:3003";
const fallbackURL = "http://212.85.19.3:3003";

const api = axios.create();

export const requestWithFallback = async (config) => {
  try {
    return await api({ ...config, baseURL: primaryURL });
  } catch (err) {
    if (err.code === "ECONNREFUSED" || err.code === "ERR_NETWORK") {
      return await api({ ...config, baseURL: fallbackURL });
    }
    throw err;
  }
};


// api.interceptors.request.use(config => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export default api;
