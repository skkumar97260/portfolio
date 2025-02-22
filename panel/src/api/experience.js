import API from "./api";
import { Experience } from "./endpoint";

export const addExperience = (data) => {
    return API.post(`${Experience}/`, data);
}
export const getExperience = () => {
    return API.get(`${Experience}/`);
}

export const getsingleExperience = (data) => {
    return API.get(`${Experience}/getsingleExperience`, { params: { _id: data } });
}
export const updateExperience = (data) => {
    return API.put(`${Experience}/`, data);   
}

export const deleteExperience = (data) => {
    return API.delete(`${Experience}/`, { params: { _id: data } });
}