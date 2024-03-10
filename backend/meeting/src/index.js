const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");
const fs = require("node:fs");

const StartServer = async () => {
	const app = express();
	await databaseConnection();
	const channel = await CreateChannel();

	// Catch application errors and deliver to logger
	app.use((error, req, res, next) => {
		const STATUS_CODE = error.statusCode || 500;
		const data = error.data || error.message;
		return res.status(STATUS_CODE).json(data);
	});
	// Set timestamp "startupTimestamp" of when the microservice started
	const startupTimestamp = new Date();

	console.log(
		`Set startupTimestamp to ${startupTimestamp.toLocaleTimeString(
			"sv-SE"
		)}`
	);
	// This is a normal HTTP Get route (path) for the microservice (part of the microservice's functionality)
	app.get("/ready", async (req, res) => {
		res.sendStatus(200);
	});
	// Respond to HTTP GET requests on route (path) "/healthz" to indicate "alive" (this is what the livenessProbe checks)

	app.get("/healthz", async (req, res) => {
		// Replace with your actual checks
		const isDatabaseConnected = await databaseConnection();

		const timestamp = new Date();

		if (isDatabaseConnected) {
			res.status(200).json({
				status: "OK",
				timestamp: timestamp.toISOString(),
			});
		} else {
			res.status(500).json({
				status: "Error",
				timestamp: timestamp.toISOString(),
				errors: {
					database: isDatabaseConnected ? "OK" : "Not connected",
				},
			});
		}
	});

	// Write file "/tmp/started" to indicate "started" (this is what the startupProbe checks)
	try {
		fs.writeFileSync("/tmp/started", "started");
		console.log("Wrote file /tmp/started.");
	} catch (err) {
		console.error(err);
	}

	await expressApp(app);

	app.listen(PORT, () => {
		console.log(`listening to port ${PORT}`);
	})

		.on("error", (err) => {
			console.log(err);
			process.exit();
		})
		.on("close", () => {
			channel.close();
		});
};

StartServer();
