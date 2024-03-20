const express = require("express");
const cors = require("cors");
const { user } = require("./api");
require("dotenv").config();

module.exports = (app, channel) => {
	app.use(express.json());
	app.use(
		cors({
			origin: [
				`http://${process.env.GATEWAY_IP}`,
				"http://localhost:3000",
				"http://localhost:80",
			],
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		})
	);

	// app.use(express.static(__dirname + "/public"));

	user(app, channel);
};
