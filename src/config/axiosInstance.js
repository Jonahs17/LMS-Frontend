import axios from "axios";

const BASE_URL = 'http://localhost:5001/api/v1';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // This is important for sending cookies with requests
});

export default axiosInstance;
