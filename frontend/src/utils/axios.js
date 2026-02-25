import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://teacher-dashboard-backend.vercel.app/api/v1",
    withCredentials: true
});