import axios from "axios";

const API_URL = process.env.API_URL;

const instance = axios.create({
    baseURL: API_URL ?? "http://localhost:3000",
    timeout: 10000,
});

export default instance;