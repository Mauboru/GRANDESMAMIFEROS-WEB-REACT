import api from "./api";

export const getUsers = () => {
    return api.get("/profile/getUsers");
};

export const setUserActive = (id) => {
    return api.post(`/profile/setUserActive/${id}`);
};

export const setUserInactive = (id) => {
    return api.post(`/profile/setUserInactive/${id}`);
};