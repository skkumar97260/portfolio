import API from "./api";
import { Intro } from "./endpoint";

export const addIntro = (data) => {
    return API.post(`${Intro}/`, data);
}
export const getIntro = () => {
    return API.get(`${Intro}/`);
}
export const getsingleIntro = (data) => {
    return API.get(`${Intro}/getsingleIntro`, { params: { _id: data } });
}

export const updateIntro = (data) => {
    return API.put(`${Intro}/`, data);   
}

export const deleteIntro = (data) => {
    return API.delete(`${Intro}/`, { params: { _id: data } });
}