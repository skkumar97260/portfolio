import API from "./api";
import { About } from "./endpoint";

export const addAbout = (data) => {
    return API.post(`${About}/`, data);
}
export const getAbout = () => {
    return API.get(`${About}/`);
}

export const getsingleAbout = (data) => {
    return API.get(`${About}/getsingleAbout`, { params: { _id: data } });
}

export const updateAbout = (data) => {
    return API.put(`${About}/`, data);   
}

export const deleteAbout = (data) => {
    return API.delete(`${About}/`, { params: { _id: data } });
}