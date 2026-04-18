
import api from "./api";

const expenseService = {
  create: async (data) => {
    const response = await api.post("/expenses", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/expenses");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/expenses/${id}`);
  },

  getSummary: async () => {
    const response = await api.get("/expenses/summary");
    return response.data;
  },
};

export default expenseService;