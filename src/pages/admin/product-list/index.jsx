import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllProduct,
	updateProduct,
} from "../../../store/global/globalAction";

const ProductList = () => {
	const dispatch = useDispatch();
	const { products, isLoading } = useSelector((state) => state.global);

	const handleGetAllProduct = () => {
		dispatch(fetchAllProduct());
	};

	const handleUpdateProduct = async (item) => {
		await dispatch(
			updateProduct({
				data: {
					id: item._id,
					product: {
						...item,
						countInStock: 10,
					},
				},
			})
		).then(() => handleGetAllProduct());
	};

	useEffect(() => {
		handleGetAllProduct();
	}, []);

	return (
		<div>
			ProductList
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				products.map((item) => (
					<div key={item._id} className="">
						<h1>{item.name}</h1>
						<p>Stock : {item.countInStock}</p>
						<button onClick={() => handleUpdateProduct(item)}>Update</button>
					</div>
				))
			)}
		</div>
	);
};

export default ProductList;
