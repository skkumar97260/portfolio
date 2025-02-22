import API from "./api";
import { Contactme } from "./endpoint";

export const addContactMe = (data) => {
    return API.post(`${Contactme}/`, data);
}

export const getContactMe = (data) => {
    return API.get(`${Contactme}/`,data);
}

export const deleteContactMe = (data) => {
    return API.delete(`${Contactme}/`, { params: { _id: data } });
}