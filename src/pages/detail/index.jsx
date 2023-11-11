import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../store/global/globalAction";
import { useEffect, useState } from "react";
import ProductImage from "../../components/product-image";
import ProductInfo from "../../components/product-detail";
import Loading from "../../components/loading";

const Page = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { isLoading } = useSelector((state) => state.global);

	const [content, setContent] = useState({});

	const handleGetSingleProduct = async () => {
		const response = await dispatch(fetchSingleProduct({ id }));
		setContent(response.payload);
	};

	useEffect(() => {
		handleGetSingleProduct();
	}, [id]);

	return (
		<>
			{isLoading ? (
				<div
					className={`"w-full flex justify-center items-center ${
						isLoading ? "h-[calc(100vh-300px)]" : null
					}`}>
					<Loading />
				</div>
			) : (
				<div className="h-96 w-full rounded-lg p-4 flex my-8">
					{content.data ? (
						<>
							<ProductImage
								imageSrc={content.data.image || null}
								altText={content.data.name}
							/>
							<ProductInfo product={content.data} />
						</>
					) : (
						<p>Data produk tidak tersedia.</p>
					)}
				</div>
			)}
		</>
	);
};

export default Page;
