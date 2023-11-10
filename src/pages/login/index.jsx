import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/auth/authAction";
import Toast from "../../components/toast";
import loginImg from "../../assets/login.svg";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Page = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async () => {
		await dispatch(
			signIn({
				data: {
					email: email,
					password: password,
				},
			})
		)
			.then((res) => {
				if (res.meta.requestStatus === "rejected") {
					Toast({
						type: "error",
						message: res.payload.response.data.message,
					});
				} else {
					Toast({
						type: "success",
						message: "Login success",
					});
				}
			})
			.catch((err) => console.log(err));
	};

	const handleEnterPress = (e) => {
		if (e.key === "Enter") {
			handleSignIn();
		}
	};
	return (
		<div className="flex flex-row w-screen h-screen items-center">
			<div className="w-1/3 bg-[#ecf4ff] p-10 flex items-center justify-center h-full">
				<img src={loginImg} alt="" />
			</div>
			<div className="flex flex-col items-center justify-center w-2/3 p-10  h-full ">
				<div className="flex flex-col">
					<Link
						to="/"
						className="mb-10 flex items-center gap-3 hover:text-blue-600">
						<BsArrowLeft /> Back
					</Link>
					<h2 className="text-xl font-thin mb-1 text-left">Welcome back!👋</h2>
					<h1 className="text-3xl font-semibold mb-5 text-left">
						Login to your account
					</h1>
					<form>
						<div className="mb-4">
							<label
								htmlFor="Email"
								className="block text-gray-600 text-sm font-medium mb-2">
								Email
							</label>
							<input
								type="text"
								id="username"
								name="username"
								placeholder="Please enter your email"
								className="border rounded-lg p-2 w-full"
								onChange={(e) => setEmail(e.target.value)}
								onKeyDown={handleEnterPress}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-gray-600 text-sm font-medium mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Enter password"
								className="border rounded-lg p-2 w-full"
								onChange={(e) => setPassword(e.target.value)}
								onKeyDown={handleEnterPress}
							/>
						</div>
						<button
							type="submit"
							disabled={isLoading}
							className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 w-full disabled:cursor-not-allowed"
							onClick={handleSignIn}>
							{isLoading ? "Proccesing Your Login" : "Submit"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Page;
