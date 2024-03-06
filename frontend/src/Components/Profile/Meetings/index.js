// import React, { useEffect, useState } from "react";
import MeetingItem from "./Item";
import { v4 as uuidv4 } from "uuid";

// import { useUserContext } from "../../../contexts/LoginContext";
// import { SERVER_URL } from "../../config";
// import { useUpdateUserContext } from "../../contexts/LoginContext";
import axios from "../../../api/axios";
import { useLoaderData } from "react-router-dom";

export const GetMeetings = async userId => {
	try {
		const { data } = await axios.get(`/meeting/my-meetings/${userId}`);

		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
	//if participant in meeting then show
};

//Component for Meeting overview
export default function ProfileMeetings() {
	// const { user } = useUserContext();
	// const meeting = await GetMeetings(user);
	const meetings = useLoaderData();
	// const [meetings, setMeetings] = useState([{}]);
	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	const fetchMeetings = async () => {
	// 		if (user) {
	// 			try {
	// 				const meeting = await GetMeetings(user);
	// 				setMeetings(meeting);
	// 			} catch (error) {
	// 				console.error("Error fetching meetings", error);
	// 			} finally {
	// 				setIsLoading(false);
	// 			}
	// 		}
	// 	};
	// 	fetchMeetings();
	// }, [user]);

	return (
		<>
			<div className="profile_container">
				{/* <div className="top_section"> */}
				{/* {!isLoading ? (
					meetings.length > 0 ? (
						meetings.map(meeting => {
							return <MeetingItem key={uuidv4()} meeting={meeting} />;
						})
					) : (
						<p className="my-meetings">No booked meetings.</p>
					)
				) : (
					<></>
				)} */}
				{meetings && meetings.length > 0 ? (
					meetings.map(meeting => {
						return <MeetingItem key={uuidv4()} meeting={meeting} />;
					})
				) : (
					<p className="my-meetings">No booked meetings.</p>
				)}
			</div>
			{/* </div> */}
		</>
	);
}
