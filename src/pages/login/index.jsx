import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/auth/authAction";

const Page = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);

	const handleSignIn = () => {
		dispatch(
			signIn({
				email: "yusron@example.co",
				password: "Password123",
			})
		);
	};

	return (
		<div className="flex flex-col">
			Login Page
			<button onClick={handleSignIn}>trigger login</button>
			{isLoading && <h1>Loading...</h1>}
		</div>
	);
};

export default Page;
