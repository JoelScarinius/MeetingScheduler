import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useUserContext } from "../contexts/LoginContext";

const RequireAuth = () => {
	const { user } = useUserContext();
	// const { auth } = useAuth();
	const location = useLocation();

	return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
