import axios from "axios";
import { SERVER_URL } from "../config";

export default axios.create({
	baseURL: SERVER_URL,
	headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
	baseURL: SERVER_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});
