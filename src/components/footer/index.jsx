import { Link } from "react-router-dom";
import LogoIcon from "../../assets/logo.svg";

const Footer = () => {
	return (
		<div className="w-full h-96 bg-sky-100 flex-col justify-center items-center gap-10 inline-flex">
			<div className="justify-start items-start gap-20 inline-flex">
				<div className="flex-col justify-center items-start gap-9 inline-flex">
					<div className="flex-col justify-center items-start gap-10 flex">
						<Link to="/" className="justify-center items-center gap-3 flex ">
							<img className="w-16 h-16" src={LogoIcon} />
							<h1 className="text-cyan-800 text-2xl font-semibold">
								E-Markets
							</h1>
						</Link>
						<div className="text-cyan-800 text-base font-normal">
							64 st james boulevard
							<br />
							hoswick , ze2 7zj
						</div>
					</div>
					<div className="flex-col justify-center items-start gap-6 flex">
						<div className="justify-center items-center gap-9 inline-flex">
							<div className="w-6 h-6 justify-center items-center flex">
								<div className="w-6 h-6 relative"></div>
							</div>
							<div className="w-6 h-6 justify-center items-center flex">
								<div className="w-6 h-6 relative"></div>
							</div>
							<div className="w-6 h-6 justify-center items-center flex">
								<div className="w-6 h-6 relative"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="justify-start items-center gap-56 flex">
					<div className="flex-col justify-center items-start gap-3 inline-flex">
						<div className="text-cyan-800 text-xl font-semibold">
							Find product
						</div>
						<div className="flex-col justify-center items-start gap-3.5 flex">
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Brownze arnold
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Chronograph blue
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Smart phones
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Automatic watch
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Hair straighteners
								</div>
							</div>
						</div>
					</div>
					<div className="flex-col justify-center items-start gap-3 inline-flex">
						<div className="text-cyan-800 text-xl font-semibold">Get help</div>
						<div className="flex-col justify-center items-start gap-3.5 flex">
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									About us
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Contact us
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Return policy
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Privacy policy
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Payment policy
								</div>
							</div>
						</div>
					</div>
					<div className="flex-col justify-center items-start gap-3 inline-flex">
						<div className="text-cyan-800 text-xl font-semibold">About us</div>
						<div className="flex-col justify-center items-start gap-3.5 flex">
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">News</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">Service</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Our policy
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">
									Custmer care
								</div>
							</div>
							<div className="justify-center items-center gap-3 inline-flex">
								<div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
								<div className="text-cyan-800 text-xl font-normal">Faq’s</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
