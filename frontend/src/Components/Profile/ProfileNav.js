import React from "react";
import { NavLink } from "react-router-dom";

const ProfileNav = () => {
	return (
		<div className="tab_area">
			<NavLink className="tab" to="my-meetings">
				My meetings
			</NavLink>
			<NavLink className="tab" to="info">
				Profile information
			</NavLink>
			<NavLink className="tab" to="contacts">
				Contacts
			</NavLink>
		</div>
	);
};

export default ProfileNav;
