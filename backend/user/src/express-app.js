const express = require("express");
const cors = require("cors");
const { user } = require("./api");

module.exports = (app, channel) => {
	app.use(express.json());
	app.use(
		cors({
			origin: ["http://20.61.25.24:80", "http://localhost:3000"],
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		})
	);

	// app.use(express.static(__dirname + "/public"));

	user(app, channel);
};
