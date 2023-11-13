import PropTypes from "prop-types";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantityCartProduct,
  removeFromCart,
} from "../../store/global/globalSlice";
import { useState } from "react";
import Toast from "../toast";
const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const handleRemoveFromCart = (product) => dispatch(removeFromCart(product));

  const handleIncrease = () => {
    if (quantity === product.countInStock - 1) {
      Toast({
        type: "error",
        message: "Max Stock Reached",
      });
    }
    setQuantity(quantity + 1);
    dispatch(addToCart(product));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decreaseQuantityCartProduct(product));
    }
  };

  return (
    <tr>
      <td className="py-2 border-b w-[40%] border-gray-200">
        <div className="flex items-center">
          <div className="w-16 h-16">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-sky-900 font-semibold">{product.name}</p>
            <p className="text-gray-500">{product.brand}</p>
            <p className="text-gray-500">{product.category}</p>
          </div>
        </div>
      </td>
      <td className="py-4 border-b border-gray-200">
        <p className="text-gray-900">Rp.{product.price}</p>
      </td>
      <td className="py-4 border-b border-gray-200">
        <div className="flex items-center">
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
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value <= product.countInStock && value >= 1) {
                setQuantity(value);
              } else if (value > product.countInStock) {
                setQuantity(product.countInStock);
                Toast({
                  type: "error",
                  message: "Max Stock Reached",
                });
              }
            }}
            inputMode="numeric"
            className="w-10 mx-2 text-center"
            autoComplete="off"
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
      </td>
      <td className="py-4 border-b border-gray-200">
        <p className="text-gray-900">Rp.{product.price * quantity}</p>
      </td>
      <td className="py-4 border-b border-gray-200">
        <button
          onClick={() => {
            handleRemoveFromCart(product);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <AiOutlineCloseCircle />
        </button>
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  product: PropTypes.object,
};

export default CartItem;
