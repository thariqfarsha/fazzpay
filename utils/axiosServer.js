import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: process.env.URL_BACKEND,
});

export default axiosApiInstance;
