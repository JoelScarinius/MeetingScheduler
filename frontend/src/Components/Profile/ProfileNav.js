import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileNav = () => {
	const { pathname } = useLocation();

	return (
		<div className="tab_area">
			<Link
				className={`tab ${pathname === "/profile/my-meetings" ? "active" : ""}`}
				to={"/profile/my-meetings"}
			>
				My meetings
			</Link>
			<Link
				className={`tab ${pathname === "/profile/info" ? "active" : ""}`}
				to={"/profile/info"}
			>
				Profile information
			</Link>
			<Link
				className={`tab ${pathname === "/profile/contacts" ? "active" : ""}`}
				to={"/profile/contacts"}
			>
				Contacts
			</Link>
		</div>
	);
};

export default ProfileNav;
