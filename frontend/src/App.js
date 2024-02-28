import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { MeetingProvider } from "./contexts/MeetingContext";
import NotFound from "./views/NotFound";
import { PageProvider } from "./contexts/PageContext";
import RequireAuth from "./Components/RequireAuth";

function App() {
	return (
		<PageProvider>
			<Routes>
				{/* Public routes */}
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />

				{/* Protected routes */}
				<Route element={<RequireAuth />}>
					<Route path="/meeting" element={<MeetingProvider />} />
					<Route path="/profile" element={<ProfileProvider />} />
				</Route>

				{/* Catch all */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</PageProvider>
	);
}

export default App;
