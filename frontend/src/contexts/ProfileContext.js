import React, { useContext, useState } from "react";
import Profile from "../views/Profile";

const TabContext = React.createContext();
const ProfileUpdateContext = React.createContext();

export function useTabContext() {
	return useContext(TabContext);
}
export function useProfileUpdate() {
	return useContext(ProfileUpdateContext);
}

// Context provider component for managing the currently open tab and profile update-related data
export const ProfileProvider = ({ children }) => {
	const [openTab, setOpenTab] = useState("info");
	const [clickedIcon, setClickedIcon] = useState(false);
	const [details, setDetails] = useState("upcoming");

	function updateTabContext(tab) {
		setOpenTab(tab);
	}

	function updateClickedIcon(clickedIcon) {
		setClickedIcon(clickedIcon);
	}

	function updateSubTabContext(details) {
		setDetails(details);
	}

	return (
		<TabContext.Provider value={openTab}>
			<ProfileUpdateContext.Provider
				value={{
					updateTabContext,
					updateClickedIcon,
					clickedIcon,
					details,
					updateSubTabContext,
				}}
			>
				{children}
				<Profile />
			</ProfileUpdateContext.Provider>
		</TabContext.Provider>
	);
};
