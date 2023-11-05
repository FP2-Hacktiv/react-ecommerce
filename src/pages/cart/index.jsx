import { useSelector, useDispatch } from "react-redux";
import { clearCarts } from "../../store/global/globalSlice";
import { checkoutProducts } from "../../store/global/globalAction";

const Page = () => {
	const dispatch = useDispatch();
	const { carts } = useSelector((state) => state.global);

	const handleClearCart = () => dispatch(clearCarts());
	const handleCheckout = () =>
		dispatch(
			checkoutProducts({
				products: carts.map((product) => ({
					product: product._id,
					quantity: product.quantity,
				})),
			})
		);

	return (
		<div>
			Cart Page
			{carts.length === 0 ? (
				<h1>No Cart</h1>
			) : (
				<>
					{carts.map((product) => (
						<div key={product._id}>
							<h1>{product.name}</h1>
							<p>qty: {product.quantity}</p>
						</div>
					))}
					<button onClick={handleClearCart}>clear carts</button>
					<button onClick={handleCheckout}>Checkout</button>
				</>
			)}
		</div>
	);
};

export default Page;
