import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useToastUpdate } from "../contexts/PageContext";

//Component for Login validation
const Login = () => {
	const { sendToastSuccess, sendToastError } = useToastUpdate();
	const { saveUser, isDataSaved, setAccessToken } = useAuth();

	const location = useLocation();
	const goTo = location.state?.from?.pathname || "/profile/my-meetings";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			// Send a POST request to login
			const { data } = await axios.post(
				"/user/login",
				{ email, password },
				{ withCredentials: true }
			);
			// Set the token in local storage
			setAccessToken(data.token);
			sendToastSuccess(data.message);
			saveUser(data.existingUser);
			setIsLoggedIn(true);
		} catch (error) {
			console.error(error);
			sendToastError(error.response.data);
		}

		// Clear the password input field
		setPassword("");
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="form_container">
				<label htmlFor="email" className="input_label">
					<span>
						Enter your email
						<b>*</b>
					</span>
					<input
						className="input_margin"
						name="email"
						type="email"
						placeholder="Email"
						autoComplete="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</label>

				<label htmlFor="password" className="input_label">
					<span>
						Enter your password
						<b>*</b>
					</span>
					<input
						className="input_margin"
						name="password"
						type="password"
						placeholder="Password"
						autoComplete="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit" id="confirmation_btn" className="links">
					Login
				</button>
				<span>
					{"No account? "}
					<Link className="links" id="signUp-signIn" to={"/signup"}>
						Sign up
					</Link>
				</span>
			</form>
			{isDataSaved && isLoggedIn && <Navigate to={goTo} replace />}
		</>
	);
};

export default Login;
