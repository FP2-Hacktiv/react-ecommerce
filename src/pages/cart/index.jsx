import { useSelector } from "react-redux";
import ShoppingCart from "../../components/cart-table";

const Page = () => {
  const { carts } = useSelector((state) => state.global);

  return (
    <div className="w-full">
      {carts.length === 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="font-semibold">No Cart</h1>
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
