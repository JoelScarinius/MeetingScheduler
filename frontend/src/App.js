import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { MeetingProvider } from "./contexts/MeetingContext";
import NotFound from "./views/NotFound";
import { PageProvider } from "./contexts/PageContext";
import RequireAuth from "./Components/RequireAuth";
// import Profile from "./views/Profile";
import ProfileInformation from "./Components/Profile/Information";
import ProfileContacts from "./Components/Profile/Contacts";
import ProfileMeetings from "./Components/Profile/Meetings";
import Profile from "./views/Profile";

function App() {
	return (
		<PageProvider>
			{/* <ProfileProvider> */}
			<Routes>
				{/* Public routes */}
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				{/* Catch all */}
				<Route path="*" element={<NotFound />} />

				{/* Protected routes */}
				<Route element={<RequireAuth />}>
					<Route path="/meeting" element={<MeetingProvider />} />

					<Route element={<ProfileProvider />}>
						<Route path="/profile" element={<Profile />}>
							<Route path="my-meetings" element={<ProfileMeetings />} />
							<Route path="info" element={<ProfileInformation />} />
							<Route path="contacts" element={<ProfileContacts />} />
						</Route>
					</Route>
				</Route>
			</Routes>
			{/* </ProfileProvider> */}
		</PageProvider>
	);
}

export default App;
