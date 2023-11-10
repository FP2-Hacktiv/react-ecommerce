import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllProduct } from "../../store/global/globalAction";
import { addToCart } from "../../store/global/globalSlice";
import troli from "../../assets/troli.svg";
import Toast from "../../components/toast";
import { Link } from "react-router-dom";

const Page = () => {
	const dispatch = useDispatch();
	const { isLoading, products } = useSelector((state) => state.global);
	const { isAuthenticated } = useSelector((state) => state.auth);

	const handleGetAllProduct = () => {
		dispatch(fetchAllProduct());
	};

	const handleAddToCart = (product) => {
		if (!isAuthenticated) {
			return Toast({
				type: "error",
				message: "Login first to add product to your cart",
			});
		}

		dispatch(addToCart(product));
		Toast({
			type: "success",
			message: `Success Add ${product.name} to Cart`,
		});
	};

	useEffect(() => {
		handleGetAllProduct();
	}, []);

	return (
		<div>
			{isLoading ? (
				<h1>Loading....</h1>
			) : (
				<div className="grid grid-cols-3 gap-10">
					{products.map((item) => (
						<div
							className="mb-3 flex flex-col shadow-2xl border-solid border-2 border-slate-500 rounded-2xl px-4 gap-2 justify-evenly"
							key={item._id}>
							<div className="flex flex-col">
								<div className="pt-2 flex items-center justify-center h-56">
									<img className="h-full" src={item.image} alt={item.name} />
								</div>
								<div className="my-2 h-[100px]">
									<Link
										to={`/detail/${item._id}`}
										className="text-xl hover:text-blue-600 font-medium">
										{item.name}
									</Link>
									<p className="text-lg font-semibold mt-3">
										IDR {item.price.toLocaleString("en-US")}
									</p>
								</div>
							</div>
							<div className="flex  pb-4">
								<button
									className="flex flex-row items-center justify-between bg-[#87BCD9] hover:bg-blue-400 transition-colors rounded-2xl min-h-[3rem] w-full text-left px-5"
									onClick={() => handleAddToCart(item)}>
									<div className=""></div>
									<p className="font-medium text-lg">Add To Cart</p>
									<img
										src={troli}
										className="h-8 w-8 bg-orange-400 rounded-full p-1"
									/>
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Page;
