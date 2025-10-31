import axios from "axios";
import { getToken } from "./storage";

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({ baseURL, timeout: 15000 });

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
