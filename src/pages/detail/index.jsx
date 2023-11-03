import { useParams } from "react-router-dom";

const Page = () => {
	const { id } = useParams();

	return <div>Detail Page {id} </div>;
};

export default Page;
