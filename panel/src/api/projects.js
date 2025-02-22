import API from "./api";
import { Projects } from "./endpoint";

export const addProjects = (data) => {
    return API.post(`${Projects}/`, data);
}
export const getProjects = () => {
    return API.get(`${Projects}/`);
}

export const getsingleProjects = (data) => {
    return API.get(`${Projects}/getsingleProjects`, { params: { _id: data } });
}
export const updateProjects = (data) => {
    return API.put(`${Projects}/`, data);   
}

export const deleteProjects = (data) => {
    return API.delete(`${Projects}/`, { params: { _id: data } });
}