import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReportSales } from "../../../store/global/globalAction";
import Toast from "../../../components/toast";
import Loading from "../../../components/loading";

const Page = () => {
	const dispatch = useDispatch();
	const [content, setContent] = useState();
	const { isLoading } = useSelector((state) => state.global);

	const handleGetReportSales = async () => {
		await dispatch(fetchReportSales()).then((res) => {
			if (res.meta.requestStatus !== "fulfilled") {
				Toast({
					type: "error",
					message: "Failed Fetch",
				});
			}

			setContent(res.payload.data);
		});
	};

	useEffect(() => {
		handleGetReportSales();
	}, []);

	return (
		<div
			className={`"w-full flex justify-center items-center ${
				isLoading ? "h-[calc(100vh-300px)]" : null
			}`}>
			{isLoading ? <Loading /> : JSON.stringify(content)}
		</div>
	);
};

export default Page;
