import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserContext, useUpdateUserContext } from "../contexts/LoginContext";
import { useToastUpdate } from "../contexts/PageContext";

//Component for navigation bar
const NavigationBar = () => {
	const { loginStatus, user } = useUserContext();
	const { updateLogin } = useUpdateUserContext();
	const { sendToastInfo } = useToastUpdate();

	const iconSize = "27px";

	const Logout = () => {
		updateLogin(false);
		sendToastInfo(`${user.firstName} successfully logged out!`);
	};

	return (
		<div id="navigationBar">
			<div id="left">
				{loginStatus && (
					<>
						<Link className="nav-buttons" to="/profile" type="button">
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
			{loginStatus ? (
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
