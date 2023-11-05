import axios from "axios";
import { useSelector } from "react-redux";

const apiInstance = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDcyNjYzZjBiM2QyNGNjODYyMzc5OCIsImlhdCI6MTY5OTE2NDM2MiwiZXhwIjoxNjk5MjAwMzYyfQ.r9QJbMW9EmQ1Xe1U2GWlE6KO-JGDWieKly34VIOgbpo",
	},
});

// apiInstance.interceptors.request.use((config) => {
// 	config.headers.Authorization =
// })

export default apiInstance;
