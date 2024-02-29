import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import { useProfileUpdate } from "../contexts/ProfileContext";
import { useUserContext } from "../contexts/LoginContext";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ProfileNav from "../Components/Profile/ProfileNav";

const Profile = ({ children }) => {
	const { user, loginStatus } = useUserContext();
	const { showUpdateView, isUpdateView } = useProfileUpdate();
	const { pathname } = useLocation();

	return (
		<>
			<div className="profile_container">
				<div className="top_section">
					{loginStatus && <span>{user.firstName + " " + user.lastName}</span>}
					{pathname === "/profile/info" && (
						<>
							{isUpdateView ? (
								<div style={{ display: "flex" }}>
									<div
										onClick={() => {
											showUpdateView(false);
										}}
										className="icon"
									>
										<ClearIcon titleAccess="Exit" />
									</div>
								</div>
							) : (
								<div
									onClick={() => {
										showUpdateView(true);
									}}
									className="icon"
								>
									<EditIcon titleAccess="Edit" />
								</div>
							)}
						</>
					)}
					{pathname === "/profile/contacts" && (
						<div className="icon">
							<PersonAddSharpIcon />
						</div>
					)}
					{pathname === "/profile/my-meetings" && (
						<div className="icon">
							<Link to="/meeting" type="button">
								<AddIcon titleAccess="Add Meeting" />
							</Link>
						</div>
					)}
				</div>
				<ProfileNav />
				{children}
				{/* <div className="tab_area">
					<ProfileTab
						tab_text="My Meetings"
						is_active={tabContext === "my_meetings"}
						tab_name="my_meetings"
					/>
					<ProfileTab
						tab_text="Profile information"
						is_active={tabContext === "info"}
						tab_name="info"
					/>
					<ProfileTab
						tab_text="Contacts"
						is_active={tabContext === "contacts"}
						tab_name="contacts"
					/>
				</div>
				{tabContext === "info" && <ProfileInformation />}
				{tabContext === "contacts" && <ProfileContacts />}
				{tabContext === "my_meetings" && <ProfileMeetings />} */}
			</div>
		</>
	);
};
export default Profile;
