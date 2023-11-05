import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPathname = location.pathname;

	const { user, isAuthenticated } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}

		if (currentPathname === "/login" && isAuthenticated) {
			navigate("/");
		}

		if (
			currentPathname === "/admin/dashboard" &&
			isAuthenticated &&
			user.isAdmin
		) {
			navigate("/admin/dashboard");
		}

		if (
			currentPathname === "/admin/dashboard" &&
			isAuthenticated &&
			!user.isAdmin
		) {
			navigate("/");
		}
	}, [isAuthenticated]);

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.element,
};

export default ProtectedRoute;
