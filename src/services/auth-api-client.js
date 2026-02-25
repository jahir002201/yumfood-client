import axios from "axios";

const authApiClient = axios.create({
    baseURL: "https://yum-food-ochre.vercel.app/api/v1",
});

export default authApiClient;

authApiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
        config.headers.Authorization = `JWT ${JSON.parse(token).access}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);