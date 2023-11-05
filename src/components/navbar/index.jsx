import UserIcon from "../../assets/user.svg";
import TrolleyIcon from "../../assets/troli.svg";
import LogoIcon from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/auth/authSlice";
import Toast from "../toast";

const Navbar = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, token } = useSelector((state) => state.auth);
	const { carts } = useSelector((state) => state.global);
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

	return (
		<div className="w-full h-24 bg-sky-900 justify-center items-center gap-80 inline-flex fixed top-0 ">
			<Link to="/" className="justify-center items-center gap-3 flex ">
				<img className="w-16 h-16" src={LogoIcon} />
				<h1 className="text-white text-2xl font-semibold">E-Markets</h1>
			</Link>
			<div className="justify-center items-center gap-7 flex">
				{isAuthenticated && token ? (
					<h1
						className="text-white text-sm font-normal font-['Poppins']"
						onClick={handleSignOut}>
						Sign Out
					</h1>
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
				<Link
					to={isAuthenticated ? "/cart" : "/login"}
					className="justify-center items-center gap-3 flex">
					<div className="justify-center items-center gap-0.5 flex">
						<div className="w-6 h-6 justify-center items-center flex">
							<div className="w-6 h-6 relative"></div>
						</div>
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
			</div>
		</div>
	);
};

export default Navbar;
