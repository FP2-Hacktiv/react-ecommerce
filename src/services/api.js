import axios from "axios";
import { getTokenFromLocalStorage } from "../utlis";

const token = getTokenFromLocalStorage();

const apiInstance = axios.create({
	baseURL: "http://localhost:5000/api/v1",
});

if (token) {
	apiInstance.interceptors.request.use((config) => {
		config.headers["Authorization"] = `Bearer ${token}`;
		return config;
	});
}

export default apiInstance;
