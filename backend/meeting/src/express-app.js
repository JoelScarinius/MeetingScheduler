const express = require("express");
const cors = require("cors");
const { meeting } = require("./api");

module.exports = async (app, channel) => {
	app.use(express.json());
	app.use(
		cors({
			origin: [`http://${process.env.GATEWAY_IP}`, "http://localhost:3000"],
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		})
	);
	// app.use(express.static(__dirname + "/public"));

	meeting(app, channel);
};
