import API from "./api";
import { Contact } from "./endpoint";

export const addContact = (data) => {
    return API.post(`${Contact}/`, data);
}
export const getContact = () => {
    return API.get(`${Contact}/`);
}

export const getsingleContact = (data) => {
    return API.get(`${Contact}/getsingleContact`, { params: { _id: data } });
}

export const updateContact = (data) => {
    return API.put(`${Contact}/`, data);   
}

export const deleteContact = (data) => {
    return API.delete(`${Contact}/`, { params: { _id: data } });
}