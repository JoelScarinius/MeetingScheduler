import { useContext, useDebugValue } from "react";
import UserContext from "../contexts/LoginContext";

const useAuth = () => {
	const { user } = useContext(UserContext);
	useDebugValue("Status", user ? "Logged In" : "Logged Out");
	return useContext(UserContext);
};

export default useAuth;
