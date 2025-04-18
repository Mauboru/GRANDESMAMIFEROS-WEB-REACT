import axios from "axios";

const primaryURL = "http://localhost:3003";
const fallbackURL = "http://212.85.19.3:3003";

const api = axios.create({
  baseURL: primaryURL,
});

// Armazena se já tentou fallback (para não entrar em loop)
let triedFallback = false;

// Interceptador de erros para fazer fallback
api.interceptors.response.use(
  response => response,
  async error => {
    // Se já tentou o fallback, não tenta de novo
    if (!triedFallback &&
        (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK" || error.message.includes("Network Error"))) {
      triedFallback = true;
      // Atualiza baseURL para o fallback
      api.defaults.baseURL = fallbackURL;
      // Reenvia a requisição com nova baseURL
      return api(error.config);
    }

    // Resetar fallback para próximas chamadas novas
    triedFallback = false;
    return Promise.reject(error);
  }
);

// Interceptador para autenticação (opcional)
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;