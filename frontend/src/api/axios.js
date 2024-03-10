import axios from "axios";
// import { SERVER_URL } from "../config";
const SERVER_URL = `http://${process.env.REACT_APP_SERVER_IP}`;

export default axios.create({
	baseURL: SERVER_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

export const axiosPrivate = axios.create({
	baseURL: SERVER_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});
