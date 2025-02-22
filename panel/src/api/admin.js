import API from "./api";
import { Signup } from "./endpoint";

export const signup = (data) => {
  return API.post(`${Signup}/`, data);
};

export const getsingleAdmin = (data) => {
  return API.get(`${Signup}/getsingleAdmin`, { params: { _id: data } });
};
