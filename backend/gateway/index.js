const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
// const proxy = require("express-http-proxy");
const cookieParser = require("cookie-parser");

const app = express();

const { CLIENT_IP, GATEWAY_PORT, NODE_ENV } = process.env;

const userProxy = createProxyMiddleware({
	target: `http://${NODE_ENV === "dev" ? "localhost" : "user"}:${+GATEWAY_PORT + 1}`,
	changeOrigin: true,
});
const meetingProxy = createProxyMiddleware({
	target: `http://${NODE_ENV === "dev" ? "localhost" : "meeting"}:${+GATEWAY_PORT + 2}`,
	changeOrigin: true,
});

const CLIENT_PROD_ORIGIN = `http://${CLIENT_IP}:3000`;

app.use(
	cors({
		origin: [CLIENT_PROD_ORIGIN, "http://localhost:3000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userProxy);
app.use("/meeting", meetingProxy);

app.listen(+GATEWAY_PORT, () => {
	console.log(`Gateway is listening to Port ${GATEWAY_PORT}`);
});
