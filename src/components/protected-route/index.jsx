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
		if (!isAuthenticated) {
			return navigate("/login");
		}

		if (isAdminRoute && isAuthenticated && !user.isAdmin) {
			return navigate("/");
		}
	}, [isAuthenticated]);

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.element,
};

export default ProtectedRoute;
