const { UserRepository } = require("../database");
const {
	GeneratePassword,
	GenerateSalt,
	GenerateSignature,
	ValidatePassword,
	ValidateUserInput,
} = require("../utils");
const {
	APIError,
	NotFoundError,
	ValidationError,
	AuthenticationError,
} = require("../utils/error/app-errors");
const jwt = require("jsonwebtoken");

// IMPORT ACCESS_TOKEN_SECRET AND REFRESH_TOKEN_SECRET

const {
	REFRESH_TOKEN_DURATION = "7d",
	ACCESS_TOKEN_DURATION = "1h",
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
} = process.env;

class UserService {
	constructor() {
		this.repository = new UserRepository();
	}

	async LogIn({ email, password }) {
		const existingUser = await this.repository.FindUser(email);

		if (!existingUser) throw new AuthenticationError("No such user found.");
		const validPassword = await ValidatePassword(
			password,
			existingUser.password,
			existingUser.salt
		);
		if (!validPassword) throw new ValidationError("Incorrect email or password.");

		const accessToken = await GenerateSignature(
			{
				email: existingUser.email,
				_id: existingUser._id,
			},
			ACCESS_TOKEN_SECRET,
			ACCESS_TOKEN_DURATION
		);

		const refreshToken = await GenerateSignature(
			{
				email: existingUser.email,
				_id: existingUser._id,
			},
			REFRESH_TOKEN_SECRET,
			REFRESH_TOKEN_DURATION
		);
		const result = await this.repository.SaveRefreshToken(refreshToken);
		console.log(result);

		return { existingUser, accessToken, refreshToken };
	}

	async SignUp({ firstName, lastName, email, password }) {
		const existingUser = await this.repository.FindUser(email);

		if (existingUser)
			throw new ValidationError("A user with this email already exist. Try to log in.");

		await ValidateUserInput("SIGNUP", {
			newFirstName: firstName,
			newLastName: lastName,
			newEmail: email,
			newPassword: password,
		});

		// Create salt
		const salt = await GenerateSalt();
		const newUserPassword = await GeneratePassword(password, salt);

		const user = await this.repository.CreateUser({
			firstName,
			lastName,
			email,
			password: newUserPassword,
			salt,
		});

		// const token = await GenerateSignature({
		// 	email: email,
		// 	_id: user._id,
		// });

		if (!user) throw new APIError("Something went wrong during user sign up.");
		// if (!token) throw new APIError("Unable to generate JSON web token.");

		// return { user, token };
		return { user };
	}

	async UpdateUser({
		newId,
		newFirstName,
		newLastName,
		newEmail,
		newPassword,
		newDescription,
		newAge,
		newGender,
		newTelephone,
		emailChanged,
	}) {
		await ValidateUserInput("UPDATE", {
			newFirstName,
			newLastName,
			newEmail,
			newPassword,
			newAge,
			newGender,
			newTelephone,
		});

		const salt = await GenerateSalt();
		const userPassword = await GeneratePassword(newPassword, salt);

		const existingUser = await this.repository.UpdateUserById({
			newId,
			newFirstName,
			newLastName,
			newEmail,
			newPassword: userPassword,
			salt,
			newDescription,
			newAge,
			newGender,
			newTelephone,
			emailChanged,
		});

		return existingUser;
	}

	//get all users
	async GetUsers() {
		const existingUsers = await this.repository.GetUsers();
		if (!existingUsers) throw new NotFoundError("No users found.");

		return existingUsers;
	}

	//get user
	async GetUser(id) {
		const existingUser = await this.repository.GetUserById(id);
		if (!existingUser) throw new NotFoundError("No user found.");
		return existingUser;
	}

	//refresh event
	async HandleRefresh(cookies) {
		if (!cookies?.jwt) throw new ValidationError("No authorization header provided.");

		console.log(cookies.jwt);
		const refreshToken = cookies.jwt;

		const existingUser = this.repository.GetUserByToken(refreshToken);
		if (!existingUser) throw new NotFoundError("No user found.");

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err || existingUser.email !== decoded.email)
				throw new AuthenticationError("Not authorized.");
			const accessToken = jwt.sign(
				{
					email: decoded.email,
					_id: decoded._id,
				},
				ACCESS_TOKEN_SECRET,
				{ expiresIn: ACCESS_TOKEN_DURATION }
			);
			return { accessToken, _id: decoded._id };
		});
	}
}

module.exports = UserService;
