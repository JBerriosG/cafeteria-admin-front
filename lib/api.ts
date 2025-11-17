import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://cafeteria-admin-jq38.onrender.com/api"
});