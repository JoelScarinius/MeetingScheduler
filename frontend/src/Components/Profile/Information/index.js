import React from "react";
import useAuth from "../../../hooks/useAuth";
import PersonalDetails from "./Details";
import { useProfileUpdate } from "../../../contexts/ProfileContext";
import Update from "./Update";

//Component for Profile Information
const ProfileInformation = () => {
	const { user } = useAuth();
	const { isUpdateView } = useProfileUpdate();

	return user && (isUpdateView ? <Update /> : <PersonalDetails />);
};

export default ProfileInformation;
