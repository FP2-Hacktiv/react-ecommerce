import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPathname = location.pathname;

	const { user, isAuthenticated } = useSelector((state) => state.auth);

	const isAdminRoute = currentPathname.includes("admin");

	useEffect(() => {
		if (currentPathname == "/" && isAuthenticated && user.isAdmin) {
			return navigate("/admin/dashboard");
		} else if (isAuthenticated && user.isAdmin && currentPathname === "/cart") {
			return navigate("/admin/dashboard");
		} else if (
			isAuthenticated &&
			user.isAdmin &&
			currentPathname.includes("/detail")
		) {
			return navigate("/admin/dashboard");
		}

		if (isAuthenticated && currentPathname === "/login") {
			return navigate("/");
		}

		if (isAdminRoute && isAuthenticated && !user.isAdmin) {
			return navigate("/");
		}

		if (isAdminRoute && !isAuthenticated) {
			return navigate("/");
		}
	}, [isAuthenticated, currentPathname]);

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.element,
};

export default ProtectedRoute;
