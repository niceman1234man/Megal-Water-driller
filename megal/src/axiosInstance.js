import axios from "axios";

const BASE_URL = "https://megal-water-driller.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
