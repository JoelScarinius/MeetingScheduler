const express = require("express");
const cors = require("cors");
const { user, appEvents } = require("./api");
const { CreateChannel, SubscribeMessage } = require("./utils");

module.exports = (app, channel) => {
	app.use(express.json());
	app.use(
		cors({
			origin: ["http://20.61.25.24:80", "http://localhost:3000"],
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		})
	);

	// app.get("/who", (req, res) => {
	// 	return res.status(200).json({ msg: "/user : I am User Service" });
	// 	// res.sendStatus(200);
	// });
	// app.use(express.static(__dirname + "/public"));

	// app.use(/whoami)

	// const channel = await CreateChannel();

	user(app, channel);
};
