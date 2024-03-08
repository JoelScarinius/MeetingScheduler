import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isAlpha, isEmail } from "validator";
import axios from "../api/axios";
import { useToastUpdate } from "../contexts/PageContext";

//Component for signup
const Signup = () => {
	const { sendToastSuccess, sendToastError } = useToastUpdate();
	const { saveUser, isDataSaved } = useAuth();

	const goTo = "/profile/info";

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	//Handle all inputs from user
	const handleSubmit = async e => {
		e.preventDefault();

		if (!isAlpha(firstName) || !isAlpha(lastName)) {
			return sendToastError("First name and last name should be letters");
		}

		if (email !== confirmEmail) {
			return sendToastError("Emails do not match");
		}

		if (password !== confirmPassword) {
			return sendToastError("Passwords do not match");
		}

		if (!firstName || !lastName || !email || !password || !confirmEmail || !confirmPassword) {
			return sendToastError("All fields are required");
		}

		if (password.length < 8) {
			return sendToastError("Password should be at least 8 characters");
		}

		if (!isEmail(email)) {
			return sendToastError("Email is not valid");
		}

		try {
			console.log(firstName, lastName, email, password);
			const { data } = await axios.post(
				"/user/signup",
				{ firstName, lastName, email, password },
				{ withCredentials: true }
			);
			console.log(data);
			// setAccessToken(data.token);
			sendToastSuccess(data.message);
			saveUser(data.user);
			setIsLoggedIn(true);
		} catch (error) {
			console.error(error);
			sendToastError(error.response.data);
		}
		setPassword("");
		setConfirmPassword("");
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="form_container">
				<label htmlFor="firstName" className="input_label">
					<span>
						Enter your first name
						<b>*</b>
					</span>
					<input
						id="firstName"
						className="input_margin"
						type="text"
						name="firstName"
						placeholder="FirstName"
						autoComplete="firstName"
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>
				</label>

				<label htmlFor="lastName" className="input_label">
					<span>
						Enter your last name
						<b>*</b>
					</span>
					<input
						id="lastName"
						className="input_margin"
						type="text"
						name="lastName"
						placeholder="LastName"
						autoComplete="lastName"
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>
				</label>

				<label htmlFor="email" className="input_label">
					<span>
						Enter your email
						<b>*</b>
					</span>
					<input
						id="email"
						className="input_margin"
						type="email"
						name="email"
						placeholder="Email"
						autoComplete="Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</label>

				<label htmlFor="confirmEmail" className="input_label">
					<span>
						Confirm your email
						<b>*</b>
					</span>
					<input
						id="confirmEmail"
						className="input_margin"
						type="email"
						name="confirmEmail"
						placeholder="Confirm email"
						autoComplete="Confirm email"
						value={confirmEmail}
						onChange={e => setConfirmEmail(e.target.value)}
					/>
				</label>

				<label htmlFor="password" className="input_label">
					<span>
						Enter your password
						<b>*</b>
					</span>
					<input
						id="password"
						className="input_margin"
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</label>

				<label htmlFor="confirmPassword" className="input_label">
					<span>
						Confirm your password
						<b>*</b>
					</span>
					<input
						id="confirmPassword"
						className="input_margin"
						type="password"
						name="confirmPassword"
						placeholder="Confirm password"
						autoComplete="Confirm Password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
				</label>

				<button id="confirmation_btn" className="links" type="submit">
					Sign up
				</button>
				<span>
					{"Already have an account? "}
					<Link className="links" id="signUp-signIn" to="/login">
						Login
					</Link>
				</span>
			</form>
			{isDataSaved && isLoggedIn && <Navigate to={goTo} replace />}
		</>
	);
};

export default Signup;
