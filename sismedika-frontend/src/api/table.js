import api from "./axios";

export const getTablesApi = () => api.get("/tables");
