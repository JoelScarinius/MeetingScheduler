import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "../Components/NavigationBar";
// import { useLocation } from "react-router-dom";

const ToastContext = React.createContext();

export function useToastUpdate() {
	return useContext(ToastContext);
}

// Context provider component for managing application
// messages displayed in a toast container
export const PageProvider = ({ children }) => {
	// const { pathname } = useLocation();

	function sendToastSuccess(message) {
		toast.success(message, {
			position: "bottom-right",
		});
	}

	function sendToastInfo(message) {
		toast.info(message, {
			position: "bottom-right",
		});
	}

	function sendToastError(error) {
		toast.error(error, {
			position: "bottom-left",
		});
	}

	return (
		<ToastContext.Provider value={{ sendToastError, sendToastSuccess, sendToastInfo }}>
			{/* {pathname === "/" && <NavigationBar />}
			{pathname === "/login" && <NavigationBar />}
			{pathname === "/signup" && <NavigationBar />}
			{pathname === "/meeting" && <NavigationBar />}
			{pathname === "/profile" && <NavigationBar />} */}
			<NavigationBar />
			<div className="page">
				{children}
				<ToastContainer />
			</div>
		</ToastContext.Provider>
	);
};
