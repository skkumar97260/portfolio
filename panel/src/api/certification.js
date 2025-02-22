import API from "./api";
import { Certification } from "./endpoint";

export const addCertification = (data) => {
    return API.post(`${Certification}/`, data);
}
export const getCertification = () => {
    return API.get(`${Certification}/`);
}

export const getsingleCertification = (data) => {
    return API.get(`${Certification}/getsingleCertification`, { params: { _id: data } });
}

export const updateCertification = (data) => {
    return API.put(`${Certification}/`, data);   
}

export const deleteCertification = (data) => {
    return API.delete(`${Certification}/`, { params: { _id: data } });
}