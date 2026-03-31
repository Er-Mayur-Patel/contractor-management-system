import api from "./api";

export const createSite = async (formData) => {
  return api.post("/sites", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const updateSite = async (id, formData) => {
  return api.put(`/sites/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const getSites = () => api.get("/sites");
export const getSite = (id) => api.get(`/sites/${id}`);
export const deleteSite = (id) => api.delete(`/sites/${id}`);