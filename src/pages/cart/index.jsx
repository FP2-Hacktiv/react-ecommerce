import { useSelector, useDispatch } from "react-redux";
import { clearCarts } from "../../store/global/globalSlice";
import { checkoutProducts } from "../../store/global/globalAction";
import Toast from "../../components/toast";

const Page = () => {
	const dispatch = useDispatch();
	const { carts, isLoading } = useSelector((state) => state.global);

	const handleClearCart = () => dispatch(clearCarts());
	const handleCheckout = async () => {
		await dispatch(
			checkoutProducts({
				products: carts.map((product) => ({
					product: product._id,
					quantity: product.quantity,
				})),
			})
		).then((res) => {
			if (res.meta.requestStatus !== "fulfilled") {
				return Toast({
					type: "error",
					message: res.payload.response.data.message,
				});
			}
			Toast({
				type: "success",
				message: "Checkout Succes",
			});
			dispatch(clearCarts());
		});
	};

	return (
		<div>
			Cart Page
			{carts.length === 0 ? (
				<h1>No Cart</h1>
			) : (
				<div>
					{isLoading ? (
						<h1>Processing Your Checkout</h1>
					) : (
						carts.map((product) => (
							<div key={product._id}>
								<h1>{product.name}</h1>
								<p>qty: {product.quantity}</p>
							</div>
						))
					)}
					<button onClick={handleClearCart}>clear carts</button>
					<button onClick={handleCheckout}>Checkout</button>
				</div>
			)}
		</div>
	);
};

export default Page;
