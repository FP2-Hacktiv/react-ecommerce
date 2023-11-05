import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../store/global/globalAction";
import { useEffect, useState } from "react";

const Page = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { isLoading } = useSelector((state) => state.global);

	const [content, setContent] = useState(null);

	const handleGetSingleProduct = async () => {
		await dispatch(fetchSingleProduct(id)).then(({ payload }) =>
			setContent(payload)
		);
	};

	useEffect(() => {
		handleGetSingleProduct();
	}, [id]);

	return <div>{isLoading ? <h1>Loading...</h1> : JSON.stringify(content)}</div>;
};

export default Page;
