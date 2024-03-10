const expressapa = require("express");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");
const { databaseConnection } = require("./database");

const StartServer = async () => {
	const app = expressapa();
	// await databaseConnection();
	const channel = await CreateChannel();

	expressApp(app);
	// const app = expressApp();
	const port = 3000;

	app.get("/who", (req, res) => {
		return res.status(200).json({ msg: "/user : I am User Service" });
		// res.sendStatus(200);
	});

	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
};

StartServer();
