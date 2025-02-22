import API from "./api";
import { Education } from "./endpoint";

export const addEducation = (data) => {
    return API.post(`${Education}/`, data);
};
export const getEducation = () => {
    return API.get(`${Education}/`);
};
export const getSingleEducation = (data) => {
    return API.get(`${Education}/getsingleEducation`, { params: { _id: data } });
};
export const updateEducation = (data) => {
    return API.put(`${Education}/`, data);
};

export const deleteEducation = (data) => {  
    return API.delete(`${Education}/`, { params: { _id: data } });
}