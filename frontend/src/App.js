import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import { LoginProvider, useUserContext } from "./contexts/LoginContext";
import { DateProvider } from "./contexts/DateContext";
import { PageProvider } from "./contexts/PageContext";

import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/Login";

import { ProfileProvider } from "./contexts/ProfileContext";
// import Profile from "./views/Profile";
import ProfileMeetings, { GetMeetings } from "./Components/Profile/Meetings";
import ProfileInformation from "./Components/Profile/Information";
import ProfileContacts from "./Components/Profile/Contacts";

import { MeetingProvider } from "./contexts/MeetingContext";

import NotFound from "./views/NotFound";
// import RequireAuth from "./Components/RequireAuth";

function App() {
	const { user } = useUserContext();

	const routes = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<PageProvider />}>
				<Route index element={<Home />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="login" element={<Login />} />

				{/* Protected routes */}
				{/* <Route element={<RequireAuth />}> */}
				<Route path="meeting" element={<MeetingProvider />} />

				<Route path="profile" element={<ProfileProvider />}>
					<Route
						path="my-meetings"
						element={<ProfileMeetings />}
						loader={() => GetMeetings(user?.id)}
					/>
					<Route path="info" element={<ProfileInformation />} />
					<Route path="contacts" element={<ProfileContacts />} />
				</Route>
				{/* </Route> */}

				{/* Catch all */}
				<Route path="*" element={<NotFound />} />
			</Route>
		)
	);
	return (
		<RouterProvider router={routes} />
		// <BrowserRouter>
		// 	<DateProvider>
		// 		<LoginProvider>
		// 			<PageProvider>
		// 				<Routes>
		// 					{/* Public routes */}
		// 					<Route path="/" element={<Home />} />
		// 					<Route path="/signup" element={<SignUp />} />
		// 					<Route path="/login" element={<Login />} />
		// 					{/* Catch all */}
		// 					<Route path="*" element={<NotFound />} />

		// 					{/* Protected routes */}
		// 					<Route element={<RequireAuth />}>
		// 						<Route path="/meeting" element={<MeetingProvider />} />

		// 						<Route path="/profile" element={<ProfileProvider />}>
		// 							{/* <Route path="/profile"> */}
		// 							{/* <ProfileProvider> */}
		// 							{/* <Profile> */}
		// 							<Route path="my-meetings" element={<ProfileMeetings />} />
		// 							<Route path="info" element={<ProfileInformation />} />
		// 							<Route path="contacts" element={<ProfileContacts />} />
		// 							{/* </Profile> */}
		// 							{/* </ProfileProvider> */}
		// 						</Route>
		// 						{/* </Route> */}
		// 					</Route>
		// 				</Routes>
		// 			</PageProvider>
		// 		</LoginProvider>
		// 	</DateProvider>
		// </BrowserRouter>
	);
}

export default App;
