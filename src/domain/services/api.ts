import axios from "axios";

const api = axios.create({
  baseURL: "http://my-json-server.typicode.com",
});

export default api;