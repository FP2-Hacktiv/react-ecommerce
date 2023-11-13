import { useSelector } from "react-redux";
import ShoppingCart from "../../components/cart-table";
import { Link } from "react-router-dom";

const Page = () => {
	const { carts } = useSelector((state) => state.global);

	return (
		<div className="w-full">
			{carts.length === 0 ? (
				<div className="flex flex-col gap-3 justify-center items-center h-[calc(100vh-300px)]">
					<h1 className="font-semibold text-3xl">
						Ops... your shopping cart is still empty
					</h1>
					<Link
						to="/"
						className="py-3 px-5 bg-sky-900 font-semibold text-lg text-white rounded-md">
						Shop Now
					</Link>
				</div>
			) : (
				<>
					<ShoppingCart cartItems={carts} />
				</>
			)}
		</div>
	);
};

export default Page;
