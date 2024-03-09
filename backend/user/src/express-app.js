const express = require("express");
const cors = require("cors");
const { user, appEvents } = require("./api");
const { CreateChannel, SubscribeMessage } = require("./utils");

module.exports = async (app) => {
	app.use(express.json());
	app.use(
		cors({
			origin: ["http://20.61.25.24:80", "http://localhost:3000"],
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		})
	);
	app.use(express.static(__dirname + "/public"));

	const channel = await CreateChannel();

	user(app, channel);
};
