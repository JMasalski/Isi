import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
})
console.log("BASE_URL:", axiosInstance.defaults.baseURL);

export default axiosInstance;