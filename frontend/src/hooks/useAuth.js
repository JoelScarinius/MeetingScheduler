import { useContext, useDebugValue } from "react";
import { useUserContext } from "../contexts/LoginContext";

const useAuth = () => {
	const { user } = useContext(useUserContext);
	useDebugValue("Status", user ? "Logged In" : "Logged Out");
	return useContext(useUserContext);
};

export default useAuth;
