import api from "services/baseService";

export const taskService = {
    getAllTask: () => api.get(`/services/app/Task/GetAll`),
};