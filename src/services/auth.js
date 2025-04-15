import api from "./api";

export const login = (emailCpf, senha) => {
    return api.post("/auth/login", {
        cpf_or_email: emailCpf,
        password: senha,
    });
};

export const registerUser = (data) => {
    return api.post("/auth/registerUser", {
        name: data.name,
        emailOrPhone: data.emailOrPhone,
        cpf: data.cpf,
        password: data.password
    });
};