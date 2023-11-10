import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllProduct } from "../../store/global/globalAction";
import { addToCart, removeFromCart } from "../../store/global/globalSlice";
import troli from "../../assets/troli.svg";
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
            <div
              className="mb-3 flex flex-col shadow-2xl border-solid border-2 border-slate-500 rounded-2xl px-4 gap-2 justify-evenly"
              key={item._id}
            >
              <div className="flex flex-col gap-1">
                <div className="pt-2 flex items-center justify-center h-56">
                  <img className="h-full" src={item.image} alt={item.name} />
                </div>
                <p className="text-base">{item.name}</p>
                <p>IDR {item.price.toLocaleString("en-US")}</p>
              </div>
              {!isAuthenticated ? (
                <div className="flex flex-col gap-2 pb-4">
                  <button
                    className="flex flex-row items-center justify-between bg-[#87BCD9] rounded-2xl min-h-[3rem] w-56 text-left px-5"
                    onClick={() => handleAddToCart(item)}
                  >
                    <p>Add Product</p>
                    <img
                      src={troli}
                      className="h-8 w-8 bg-orange-400 rounded-full p-1"
                    />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2 pb-4">
                    <button
                      className="flex flex-row items-center justify-between bg-[#87BCD9] rounded-2xl min-h-[3rem] w-56 text-left px-5"
                      onClick={() => handleAddToCart(item)}
                    >
                      <p>Add Product</p>
                      <img
                        src={troli}
                        alt="Troli"
                        className="h-8 w-8 bg-orange-400 rounded-full p-1"
                      />
                    </button>
                    <button
                      className="flex flex-row items-center justify-between rounded-2xl min-h-[3rem] w-56 text-left px-5 bg-red-500"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remove Product
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
