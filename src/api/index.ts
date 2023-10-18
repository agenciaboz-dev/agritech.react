import axios from "axios"
import { url } from "./backend"

export const api = axios.create({
    // baseURL: "http://localhost:4106/api",
    baseURL: `http${url}/api`,
    timeout: 1000 * 10,
})
