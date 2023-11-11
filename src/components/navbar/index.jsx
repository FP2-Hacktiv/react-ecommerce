import UserIcon from "../../assets/user.svg";
import TrolleyIcon from "../../assets/troli.svg";
import LogoIcon from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/auth/authSlice";
import Toast from "../toast";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
	const [isDropdownShow, setIsDropdownShow] = useState(false);
	const dispatch = useDispatch();
	const { isAuthenticated, token, user } = useSelector((state) => state.auth);
	const { carts } = useSelector((state) => state.global);
	const location = useLocation();
	const currentPathname = location.pathname;

	const totalQuantityInCart = carts.reduce((acc, item) => {
		return item.quantity + acc;
	}, 0);

	const handleSignOut = () => {
		dispatch(signOut());
		Toast({
			type: "success",
			message: "Sign Out Success",
		});
	};

	useEffect(() => {
		setIsDropdownShow(false);
	}, [currentPathname]);

	return (
		<div
			className="w-full h-24 bg-sky-900 justify-center items-center gap-80 inline-flex fixed top-0 "
			onMouseLeave={() => setIsDropdownShow(false)}>
			<Link to="/" className="justify-center items-center gap-3 flex ">
				<img className="w-16 h-16" src={LogoIcon} />
				<h1 className="text-white text-2xl font-semibold">E-Markets</h1>
			</Link>
			<div className="justify-center items-center gap-7 flex">
				{isAuthenticated && token ? (
					<>
						<Link
							to={isAuthenticated ? "/cart" : "/login"}
							className="justify-center items-center gap-3 flex">
							<div className="justify-center items-center gap-0.5 flex">
								<img src={TrolleyIcon} alt="trolley icon" className="w-6 h-6" />
								<div className="w-5 h-5 bg-amber-500 rounded-full flex-col justify-center items-center gap-2 inline-flex">
									<div className="text-white text-xs font-normal font-['Poppins']">
										{totalQuantityInCart}
									</div>
								</div>
							</div>
							<div className="text-white text-sm font-normal font-['Poppins']">
								Cart
							</div>
						</Link>
						<div className="relative inline-block text-left">
							<div>
								<button
									onClick={() => setIsDropdownShow((prev) => !prev)}
									type="button"
									className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-white "
									id="menu-button"
									aria-expanded="true"
									aria-haspopup="true">
									{user.name}
									<svg
										className="-mr-1 h-5 w-5 text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true">
										<path
											fillRule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>

							{isDropdownShow && (
								<div
									className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="menu-button"
									tabIndex="-1">
									<div className="py-1" role="none">
										{user.isAdmin && (
											<>
												<Link to="/admin/dashboard">
													<div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200">
														Sales Recap ( Admin)
													</div>
												</Link>
												<Link to="/admin/product-list">
													<div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200">
														Product List ( Admin )
													</div>
												</Link>
											</>
										)}
										<form method="POST" action="#" role="none">
											<button
												type="submit"
												className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
												role="menuitem"
												onClick={handleSignOut}>
												Sign out
											</button>
										</form>
									</div>
								</div>
							)}
						</div>
					</>
				) : (
					<div className="justify-center items-center gap-3 flex">
						<div className="w-6 h-6 justify-center items-center flex">
							<div className="w-6 h-6 relative">
								<img
									src={UserIcon}
									alt="user icon"
									width="100%"
									height="100%"
								/>
							</div>
						</div>
						<Link
							to="/login"
							className="text-white text-sm font-normal font-['Poppins']">
							Sign in
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
