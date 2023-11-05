import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReportSales } from "../../../store/global/globalAction";
import Toast from "../../../components/toast";

const Page = () => {
	const dispatch = useDispatch();
	const [content, setContent] = useState();

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
		<div className="flex flex-col">
			<h1>Admin Dashboard Page</h1>
			{content && JSON.stringify(content)}
		</div>
	);
};

export default Page;
