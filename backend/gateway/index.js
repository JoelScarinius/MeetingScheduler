const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();

const { DEV_GATEWAY_URL, PROD_GATEWAY_URL, CLIENT_PROD_ORIGIN, CLIENT_DEV_ORIGIN } = process.env;
const isDevEnv = process.env.NODE_ENV === "dev";

const proxyURL = isDevEnv ? DEV_GATEWAY_URL : PROD_GATEWAY_URL;

const userProxy = createProxyMiddleware({ target: `${proxyURL}:5001`, changeOrigin: true });
const meetingProxy = createProxyMiddleware({ target: `${proxyURL}:5002`, changeOrigin: true });

app.use(
	cors({
		origin: [CLIENT_PROD_ORIGIN, CLIENT_DEV_ORIGIN],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(express.json());

app.use("/user", userProxy);
app.use("/meeting", meetingProxy);

app.listen(5000, () => {
	console.log("Gateway is Listening to Port 5000");
});
