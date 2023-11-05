import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllProduct } from "../../store/global/globalAction";
import { addToCart, removeFromCart } from "../../store/global/globalSlice";
import Toast from "../../components/toast";

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

	const handleRemoveFromCart = (product) => dispatch(removeFromCart(product));

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
						<div className="mb-3 flex flex-col gap-5 " key={item._id}>
							<img src={item.image} alt="" />
							{item.name}
							<button
								className="bg-red-500"
								onClick={() => handleAddToCart(item)}>
								Add Product
							</button>
							<button
								className="bg-red-500"
								onClick={() => handleRemoveFromCart(item)}>
								Remove Product
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Page;
