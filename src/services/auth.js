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
        email: data.email,
        cpf: data.cpf,
        password: data.password
    });
};

export const sendEmailReset = (email) => {
    return api.post("/auth/sendEmailReset", {
        email: email,
    });
};