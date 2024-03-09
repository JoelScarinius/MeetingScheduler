const UserService = require("../services/user-service");
const { SubscribeMessage, PrintFormattedMessage } = require("../utils");
const UserAuth = require("./middlewares/auth");
// const cookie = require("cookie-parser");

module.exports = (app, channel) => {
	const service = new UserService();

	// To listen
	SubscribeMessage(channel, service);

	// Sign up user
	app.post("/signup", async (req, res, next) => {
		try {
			console.log("I run");
			console.log(req);
			const userInput = req.body;
			const { user } = await service.SignUp(userInput);
			// Send a success response with user information
			res.status(201).json({
				message: `${user.firstName} signed in!`,
				user,
			});
		} catch (error) {
			next(error);
		}
	});

	// Login a user
	app.post("/login", async (req, res, next) => {
		try {
			const { email, password } = req.body;
			const { existingUser, accessToken, refreshToken } = await service.LogIn({
				email,
				password,
			});

			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "None",
				maxAge: 24 * 60 * 60 * 1000,
			});

			res.status(200).json({
				existingUser,
				accessToken,
				message: `${existingUser.firstName} logged in!`,
			});
		} catch (error) {
			next(error);
		}
	});

	// get all users
	app.get("/users", UserAuth, async (req, res, next) => {
		try {
			const existingUsers = await service.GetUsers();
			res.json(existingUsers);
		} catch (error) {
			next(error);
		}
	});

	// get user
	app.get("/:userId", UserAuth, async (req, res, next) => {
		try {
			const userId = req.params.userId;
			const user = await service.GetUser(userId);
			res.json(user);
		} catch (error) {
			next(error);
		}
	});

	// update user
	app.post("/update", UserAuth, async (req, res, next) => {
		try {
			const userInput = req.body;
			const user = await service.UpdateUser(userInput);
			PrintFormattedMessage(`${user.firstName}'s personal info was updated.`);
			res.status(200).json({
				user,
				message,
			});
		} catch (error) {
			next(error);
		}
	});

	// app.post("/", async (req, res, next) => {
	// 	try {
	// 		await UserAuth(req, res, next);
	// 		const message = `${req.body.user} is still logged in.`;
	// 		PrintFormattedMessage(message);
	// 		res.status(200).json({ message });
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// });

	// User refresh
	app.post("/refresh", async (req, res, next) => {
		try {
			const cookies = req.cookies;

			const { accessToken, _id } = await service.HandleRefresh(cookies);
			const user = await service.GetUser(_id);

			const message = `${user.firstName} is still logged in.`;
			PrintFormattedMessage(message);
			res.status(200).json({ message, accessToken, user });
		} catch (error) {
			next(error);
		}
	});

	app.get("/whoami", (req, res, next) => {
		return res.status(200).json({ msg: "/user : I am User Service" });
	});
};
