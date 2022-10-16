import axios from "axios";

export const api = axios.create({
  // baseURL: "https://contacts-manager-api-s1.herokuapp.com",
  baseURL: "http://localhost:3005",
});
