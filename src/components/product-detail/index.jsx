import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addToCart } from "../../store/global/globalSlice";
import Toast from "../toast";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleIncrease = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
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

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-xl font-semibold text-sky-900">{product.name}</h2>
      <p className="text-gray-600 mt-2 font-bold text-2xl">
        Rp. {product.price}
      </p>
      <p className="text-gray-600 mt-2 font-semibold">
        Availability:{" "}
        <span className="text-green-500">{product.countInStock} in stock</span>
      </p>
      <div className="mt-4">
        <span className="text-gray-700 mt-2 ">{product.description}</span>
      </div>
      <hr className="w-full mt-4 border-slate-400 border-1" />

      <div className="mt-4">
        <div className="flex items-center">
          <label htmlFor="quantity" className="mr-2">
            Quantity:
          </label>
          <button
            onClick={handleDecrease}
            className={`px-2 py-1 border border-gray-300 rounded-md ${
              quantity === 1 ? "bg-gray-200 text-gray-400" : ""
            }`}
            disabled={quantity === 1}
          >
            -
          </button>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputMode="numeric"
            className="w-10 mx-2 text-center"
          />
          <button
            onClick={handleIncrease}
            className={`px-2 py-1 border border-gray-300 rounded-md ${
              quantity === product.countInStock
                ? "bg-gray-200 text-gray-400"
                : ""
            }`}
            disabled={quantity === product.countInStock}
          >
            +
          </button>
        </div>
      </div>

      <button
        className="bg-yellow-500 h-14 w-52 text-white px-4 py-2 rounded-3xl mt-6"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
};

export default ProductInfo;
