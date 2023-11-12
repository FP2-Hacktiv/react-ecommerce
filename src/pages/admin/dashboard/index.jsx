import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReportSales } from "../../../store/global/globalAction";
import Toast from "../../../components/toast";
import Loading from "../../../components/loading";

const Page = () => {
	const dispatch = useDispatch();
	const [content, setContent] = useState([]);
	const { isLoading } = useSelector((state) => state.global);

	const handleGetReportSales = async () => {
		await dispatch(fetchReportSales()).then((res) => {
			if (res.meta.requestStatus !== "fulfilled") {
				return Toast({
					type: "error",
					message: res.payload.response.data.message,
				});
			}

			setContent(res.payload.data);
		});
	};

	const totalProfit = content.reduce(
		(total, item) => total + item.totalProfit,
		0
	);

	useEffect(() => {
		handleGetReportSales();
	}, []);

	return (
		<>
			{isLoading ? (
				<div
					className={`"w-full flex justify-center items-center  h-[calc(100vh-300px)]`}>
					<Loading />
				</div>
			) : (
				<div className="w-full mx-auto">
					<h1 className="text-xl font-bold mb-4 text-center">Sales Recap</h1>
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-slate-200 font-medium">
								<td className="text-left py-2 px-4">Product Name</td>
								<td className="text-left py-2 px-4">Total Sold</td>
								<td className="text-left py-2 px-4">Product Price</td>
								<td className="text-left py-2 px-4">Profit</td>
							</tr>
						</thead>
						<tbody>
							{content.map((item, index) => (
								<tr key={index} className="border-b">
									<td className="py-2 px-4">{item.productName}</td>
									<td className="py-2 px-4">{item.totalSold}</td>
									<td className="py-2 px-4">{item.productPrice}</td>
									<td className="py-2 px-4">{item.totalProfit}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="text-right mt-3">
						{/* <hr className="" /> */}
						<p className="font-semibold">Total Profit: {totalProfit}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Page;
