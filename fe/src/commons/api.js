
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const token = JSON.parse(localStorage.getItem("token"));

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:`Bearer ${token}`
   },
});