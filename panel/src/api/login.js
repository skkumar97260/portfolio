import API from "./api";
import { Login } from "./endpoint";

export const login= (data) => {
  return API.post(`${Login}/`, data);
};