import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/auth/authAction";
import Toast from "../../components/toast";

const Page = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);

	const handleSignIn = async () => {
		await dispatch(
			signIn({
				data: {
					email: "yusron@example.com",
					password: "Password123",
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

	return (
		<div className="flex flex-col">
			Login Page
			<button onClick={handleSignIn}>trigger login</button>
			{isLoading && <h1>Loading...</h1>}
		</div>
	);
};

export default Page;
