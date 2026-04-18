
import api from "./api";

const categoryService = {
  create: async (data) => {
    const response = await api.post("/categories", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
};

export default categoryService;