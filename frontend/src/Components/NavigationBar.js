import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuth from "../hooks/useAuth";
import { useToastUpdate } from "../contexts/PageContext";

//Component for navigation bar
const NavigationBar = () => {
	const { user, saveUser } = useAuth();
	const { sendToastInfo } = useToastUpdate();

	const iconSize = "27px";

	const Logout = () => {
		const loggedOutUserName = user.firstName;
		saveUser(null);
		sendToastInfo(`${loggedOutUserName} logged out!`);
	};

	return (
		<div id="navigationBar">
			<div id="left">
				{user && (
					<>
						<Link className="nav-buttons" to="/profile/my-meetings" type="button">
							<AccountCircleIcon
								fontSize="large"
								sx={{ color: "#daa520", height: iconSize }}
								titleAccess="Profile Page"
							/>
						</Link>
						<Link className="nav-buttons" to="/meeting" type="button">
							<AddIcon
								fontSize="large"
								sx={{ color: "#daa520", height: iconSize }}
								titleAccess="Add Meeting"
							/>
						</Link>
					</>
				)}
			</div>
			{user ? (
				<div id="navButtons" className="flex-se right">
					<span id="logged_in">{`${user.firstName} ${user.lastName}`}</span>

					<Link className="nav-buttons" to="/" type="button">
						<span onClick={() => Logout()}>Log out</span>
					</Link>
				</div>
			) : (
				<div id="navButtons" className="flex-se right">
					<Link className="nav-buttons" to="/signup" type="button">
						<i>Sign up</i>
					</Link>
					<Link className="nav-buttons" to="/login" type="button">
						<span>Login</span>
					</Link>
				</div>
			)}
		</div>
	);
};

export default NavigationBar;
