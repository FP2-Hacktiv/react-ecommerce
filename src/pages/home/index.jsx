import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllProduct } from "../../store/global/globalAction";
import { addToCart } from "../../store/global/globalSlice";
import troli from "../../assets/troli.svg";
import Toast from "../../components/toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

const Page = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { products, isLoading, carts } = useSelector((state) => state.global);
	const { isAuthenticated } = useSelector((state) => state.auth);

	const handleGetAllProduct = () => {
		dispatch(fetchAllProduct());
	};

	const handleAddToCart = (product) => {
		if (!isAuthenticated) {
			navigate("/login");
			return Toast({
				type: "error",
				message: "Login first to add product to your cart",
			});
		}

		const productInCart = carts.find((item) => item._id === product._id);
		if (productInCart) {
			const totalQuantity = productInCart.quantity + 1;
			if (totalQuantity > product.countInStock) {
				return Toast({
					type: "error",
					message: `Failed to add product ${product.name} to Cart. Exceeds available stock!`,
				});
			}
		} else {
			if (product.countInStock === 0) {
				return Toast({
					type: "error",
					message: `Failed to add product ${product.name} to Cart. We are out of stock!`,
				});
			}
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
		<div
			className={`"w-full flex justify-center items-center ${
				isLoading ? "h-[calc(100vh-300px)]" : null
			}`}>
			{isLoading ? (
				<Loading />
			) : (
				<div className="grid grid-cols-3 gap-10 ">
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
