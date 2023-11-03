import PropTypes from "prop-types";

const PageLayout = ({ children }) => {
	return (
		<main className=" w-full max-w-sm md:max-w-7xl mx-auto p-5 md:p-8">
			{children}
		</main>
	);
};

PageLayout.propTypes = {
	children: PropTypes.element,
};

export default PageLayout;
