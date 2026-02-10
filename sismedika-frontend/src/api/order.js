import api from "./axios";

export const openOrderApi = (table_id) =>
  api.post("/orders/open", { table_id });

export const addItemApi = (data) =>
  api.post("/orders/add-item", data);

export const getOrderApi = (id) =>
  api.get(`/orders/${id}`);

export const finishOrderApi = (order_id) =>
  api.post("/orders/finish", { order_id });

export const closeOrderApi = (order_id) =>
  api.post("/orders/close", { order_id });

export const getOrdersApi = () =>
  api.get("/orders");
export const downloadReceipt = (id) => api.get(`/orders/${id}/receipt`, { responseType: "blob" });
