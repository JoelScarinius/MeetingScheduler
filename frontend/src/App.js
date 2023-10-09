import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import NavigationBar from "./Components/NavigationBar";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { BookingProvider } from "./contexts/BookingContext";
import Pages from "./Components/Pages";
import NotFound from "./views/NotFound";

function App() {
	return (
		<>
			{window.location.pathname === "/" && <NavigationBar />}
			{window.location.pathname === "/login" && <NavigationBar />}
			{window.location.pathname === "/register" && <NavigationBar />}
			{window.location.pathname === "/booking" && <NavigationBar />}
			{window.location.pathname === "/profile" && <NavigationBar />}
			<Pages>
				<Routes>
					<Route path="/booking" element={<BookingProvider />} />
					<Route path="/profile" element={<ProfileProvider />} />
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Pages>
		</>
	);
}

export default App;
