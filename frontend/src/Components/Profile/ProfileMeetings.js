import React, { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { useUserContext } from "../../contexts/LoginContext";
<<<<<<< HEAD
import { SERVER_URL } from "../../config";
=======
import serverUrl from "../../utils/config";
import { useUpdateUserContext } from "../../contexts/LoginContext";
>>>>>>> fix/sessionValidation

const GetMeetings = async user => {
	try {
		const { data } = await axios.get(
<<<<<<< HEAD
			SERVER_URL + `/meeting/meeting/users?paramName=${user._id}`
=======
			serverUrl +
				`/meeting/meeting/users?paramName=${user.existingUser._id}`
>>>>>>> fix/sessionValidation
		);

		return data;
	} catch (error) {
		console.error(error);
	}
	//if participant in meeting then show
};

//Component for Meeting overview
const ProfileMeetings = () => {
	const { setHeader } = useUpdateUserContext();
	const { user } = useUserContext();
	const [meetings, setMeetings] = useState([{}]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMeetings = async () => {
			try {
				setHeader();
				const meeting = await GetMeetings(user);
				setMeetings(meeting);
			} catch (error) {
				console.error("Error fetching meetings", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchMeetings();
	}, [user, setHeader]);

	return (
		<>
			<div className="profile_container">
				{/* <div className="top_section"> */}
				{!isLoading ? (
					meetings.map(meeting => {
						return <MeetingItem key={uuidv4()} meeting={meeting} />;
					})
				) : (
					<></>
				)}
			</div>
			{/* </div> */}
		</>
	);
};

export default ProfileMeetings;
