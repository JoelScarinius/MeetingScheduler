import { createContext, useState } from "react";
// import axios from "../api/axios";

const UserContext = createContext({});

// export function useUserContext() {
// 	return useContext(userContext);
// }

// const validateUserSession = async user => {
// 	try {
// 		// const token = localStorage.getItem("token");
// 		// const user = JSON.parse(localStorage.getItem("user"));
// 		// console.log(token);
// 		console.log(user);
// 		// saveUser(user);

// 		// Verify jwt token
// 		// if (token) {

// 		const res = await axios.post("/user/", { user: user ? user.firstName : "User" });
// 		// console.log(res);
// 		console.log(res.data.message);
// 		// }
// 		// if (user) return user;
// 		// else return null;
// 		return true;
// 	} catch (error) {
// 		localStorage.setItem("token", "");
// 		console.log(error);
// 		console.log("No user session currently active");
// 		return false;
// 		// navigate("/");
// 	}
// };

export const LoginProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	// const [loginStatus, setLoginStatus] = useState(false);
	const [isDataSaved, setIsDataSaved] = useState(false);
	// const [cookies, removeCookie] = useCookies([]);

	// function updateLogin(status) {
	// 	if (status) {
	// 		setLoginStatus(true);
	// 	} else {
	// 		setLoginStatus(false);
	// 	}
	// }

	function saveUser(user) {
		setUser(user);
		setIsDataSaved(true);
	}

	// function setAccessToken(token) {
	// 	if (token) {
	// 		localStorage.setItem("token", `Bearer ${token}`);
	// 	}
	// }

	// useEffect(() => {
	// 	setUser(() => {
	// 		const storedUser = localStorage.getItem("user");

	// 		if (storedUser && storedUser !== undefined) {
	// 			const savedUser = JSON.parse(storedUser);
	// 			console.log(savedUser);
	// 			return savedUser;
	// 		}
	// 	});
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem("user", JSON.stringify(user));

	// 	// console.log(user);
	// 	// isDataSaved(false);
	// 	// setIsDataSaved(false);
	// 	const verifyCookie = async () => {
	// 		try {
	// 			// await validateUserSession(user);
	// 			// setIsLoggedIn(await validateUserSession(user));
	// 			// if (result) {
	// 			// const user = await getUser();
	// 			// if (!user) setUser(user);
	// 			// if (
	// 			// 	!logoutPressed &&
	// 			// 	window.location.pathname !== "/" &&
	// 			// 	window.location.pathname !== "/login" &&
	// 			// 	window.location.pathname !== "/signup"
	// 			// ) {
	// 			// 	updateLogin(true);
	// 			// 	updateLogoutPressed(false);
	// 			// } else {
	// 			// 	updateLogin(false);
	// 			// }
	// 			// }
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	verifyCookie();
	// }, [user]);

	return (
		<UserContext.Provider
			value={{
				user,
				accessToken,
				isDataSaved,
				saveUser,
				setAccessToken,
			}}
		>
			{children}
			{/* {isDataSaved && isLoggedIn ? children : <></>} */}
		</UserContext.Provider>
	);
};

export default UserContext;
