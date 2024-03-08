import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import { useProfileUpdate } from "../contexts/ProfileContext";
import useAuth from "../hooks/useAuth";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation, Outlet } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ProfileNav from "../Components/Profile/ProfileNav";

const Profile = () => {
	const { user } = useAuth();
	const { showUpdateView, isUpdateView } = useProfileUpdate();
	const { pathname } = useLocation();

	return (
		<div className="profile_container">
			<div className="top_section">
				{user && <span>{user.firstName + " " + user.lastName}</span>}
				{pathname === "/profile/my-meetings" && (
					<div className="icon">
						<Link to="/meeting" type="button">
							<AddIcon titleAccess="Add Meeting" />
						</Link>
					</div>
				)}
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
			</div>
			<ProfileNav />
			<Outlet />
		</div>
	);
};
export default Profile;
