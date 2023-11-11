import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProduct,
  updateProduct,
} from "../../../store/global/globalAction";
import Toast from "../../../components/toast";
import Loading from "../../../components/loading";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.global);
  const [quantities, setQuantities] = useState({});

  const handleGetAllProduct = () => {
    dispatch(fetchAllProduct());
  };

  const handleIncrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const handleDecrease = (productId) => {
    if (quantities[productId] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  const handleUpdateProduct = async (item) => {
    const updatedQuantity = quantities[item._id] || 0;

    await dispatch(
      updateProduct({
        data: {
          id: item._id,
          product: {
            ...item,
            countInStock: updatedQuantity,
          },
        },
      })
    )
      .then(() => {
        Toast({
          type: "success",
          message: `Update Stock ${item.name} Success`,
        });
        handleGetAllProduct();
        setQuantities({});
      })
      .catch(() => {
        Toast({
          type: "error",
          message: `Error Update Stock ${item.name}`,
        });
      });
  };

  useEffect(() => {
    handleGetAllProduct();
    const defaultQuantities = {};
    products.forEach((item) => {
      defaultQuantities[item._id] = item.countInStock || 0;
    });
    setQuantities(defaultQuantities);
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className={`"w-full flex justify-center items-center ${
            isLoading ? "h-[calc(100vh-300px)]" : null
          }`}
        >
          <Loading />
        </div>
      ) : (
        <div className="w-full max-w-screen-xl mx-auto flex mt-8">
          <div className="w-[70%] mx-auto">
            <table className="w-[100%]">
              <thead className="bg-slate-200 h-8">
                <tr className="border-b border-slate-300 font-medium">
                  <td className="text-left pl-2">Product</td>
                  <td className="text-left pl-2">Price</td>
                  <td className="text-left pl-2">Quantity</td>
                  <td className="text-left pl-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id}>
                    <td className="py-2 border-b w-[40%] border-gray-200">
                      <div className="flex items-center">
                        <div className="w-16 h-16">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sky-900 font-semibold">
                            {item.name}
                          </p>
                          <p className="text-gray-500">{item.brand}</p>
                          <p className="text-gray-500">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 border-b border-gray-200">
                      <p className="text-gray-900">Rp.{item.price}</p>
                    </td>
                    <td className="py-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecrease(item._id)}
                          className="px-2 py-1 border border-gray-300 rounded-md"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={quantities[item._id] || item.countInStock}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [item._id]: parseInt(e.target.value) || 0,
                            })
                          }
                          inputMode="numeric"
                          className="w-10 mx-2 text-center"
                        />
                        <button
                          onClick={() => handleIncrease(item._id)}
                          className="px-2 py-1 border border-gray-300 rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 border-b border-gray-200">
                      <button
                        className="bg-yellow-500 text-white w-full px-4 py-2 rounded-full"
                        onClick={() => handleUpdateProduct(item)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
