import { createContext, useContext, useState } from "react";
import Profile from "../views/Profile";

const ProfileUpdateContext = createContext();

export function useProfileUpdate() {
	return useContext(ProfileUpdateContext);
}

// Context provider component for managing the currently open tab and profile update-related data
export const ProfileProvider = ({ children }) => {
	const [isUpdateView, setIsUpdateView] = useState(false);
	const [details, setDetails] = useState("upcoming");

	function showUpdateView(isClicked) {
		setIsUpdateView(isClicked);
	}

	function updateSubTabContext(details) {
		setDetails(details);
	}

	return (
		<ProfileUpdateContext.Provider
			value={{
				showUpdateView,
				isUpdateView,
				details,
				updateSubTabContext,
			}}
		>
			{/* {children} */}
			<Profile />
		</ProfileUpdateContext.Provider>
	);
};
