import axios from "axios";
import { getTokenFromLocalStorage } from "../utlis";

const token = getTokenFromLocalStorage();

const apiInstance = axios.create({
	baseURL: "https://online-shop-api-fp.vercel.app/api/v1",
});

if (token) {
	apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default apiInstance;
