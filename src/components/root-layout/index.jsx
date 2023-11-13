import Footer from "../footer";
import Navbar from "../navbar";
import PropTypes from "prop-types";

const RootLayout = ({ children }) => {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

RootLayout.propTypes = {
	children: PropTypes.element,
};

export default RootLayout;
