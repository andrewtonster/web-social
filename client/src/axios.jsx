import axios from "axios";

console.log(import.meta.env.VITE_API);
export const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});
