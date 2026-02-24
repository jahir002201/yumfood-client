import axios from "axios";

export default axios.create({
    baseURL: "https://yum-food-ochre.vercel.app/api/v1",
});