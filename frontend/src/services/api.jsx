import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
    baseURL: "http://localhost:3002",
    //baseURL: "http://3.88.249.155:3001",
    headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
            // For example, redirect to the login page
            window.location.href = "/";
        } else {
            // console.log(error.response.data.errors)
        }
        return Promise.reject(error);
    }
);