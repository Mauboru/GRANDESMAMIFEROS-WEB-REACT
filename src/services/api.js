import axios from "axios";

const api = axios.create({
    // baseURL: "http://212.85.19.3:3001",
    baseURL: "https://fw.infotech-solucoes.com/api",
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
