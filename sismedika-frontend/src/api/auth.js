import api from "./axios";

export const loginApi = (data) => api.post("/login", data);
export const logoutApi = () => api.post("/logout");
export const profileApi = () => api.get("/profile");
