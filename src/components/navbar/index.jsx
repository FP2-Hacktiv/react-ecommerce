import UserIcon from "../../assets/user.svg";
import TrolleyIcon from "../../assets/troli.svg";
import LogoIcon from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="w-full h-24 bg-sky-900 justify-center items-center gap-80 inline-flex">
			<Link to="/" className="justify-center items-center gap-3 flex ">
				<img className="w-16 h-16" src={LogoIcon} />
				<h1 className="text-white text-2xl font-semibold">E-Markets</h1>
			</Link>
			<div className="justify-center items-center gap-7 flex">
				<div className="justify-center items-center gap-3 flex">
					<div className="w-6 h-6 justify-center items-center flex">
						<div className="w-6 h-6 relative">
							<img src={UserIcon} alt="user icon" width="100%" height="100%" />
						</div>
					</div>
					<Link
						to="/login"
						className="text-white text-sm font-normal font-['Poppins']">
						Sign in
					</Link>
				</div>
				<Link to="/cart" className="justify-center items-center gap-3 flex">
					<div className="justify-center items-center gap-0.5 flex">
						<div className="w-6 h-6 justify-center items-center flex">
							<div className="w-6 h-6 relative"></div>
						</div>
						<img src={TrolleyIcon} alt="trolley icon" className="w-6 h-6" />
						<div className="w-3.5 h-3.5 bg-amber-500 rounded-full flex-col justify-center items-center gap-2 inline-flex">
							<div className="text-white text-xs font-normal font-['Poppins']">
								0
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
