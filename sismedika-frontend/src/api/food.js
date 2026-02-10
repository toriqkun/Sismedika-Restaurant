import api from "./axios";

export const getFoodsApi = () => api.get("/foods");
export const createFood = (data) => api.post("/foods", data);
export const updateFood = (id, data) => api.post(`/foods/${id}`, data);
export const deleteFood = (id) => api.delete(`/foods/${id}`);
