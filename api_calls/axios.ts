import axios from "axios";
export const fetchApi = axios.create({
  // baseURL: process.env.SERVER_ADDR || "http://68.183.186.8:3500",
  baseURL: "http://localhost:3500",
});
