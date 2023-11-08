import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../cart-item";
import Toast from "../toast";
import { checkoutProducts } from "../../store/global/globalAction";
import { clearCarts } from "../../store/global/globalSlice";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { carts } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subTotal, setSubTotal] = useState(0);

  const handleCheckout = async () => {
    await dispatch(
      checkoutProducts({
        products: carts.map((product) => ({
          product: product._id,
          quantity: product.quantity,
        })),
      })
    ).then((res) => {
      if (res.meta.requestStatus !== "fulfilled") {
        return Toast({
          type: "error",
          message: res.payload.response.data.message,
        });
      }
      Toast({
        type: "success",
        message: "Checkout Success",
      });
      dispatch(clearCarts());
    });
  };

  const handleClearCart = () => dispatch(clearCarts());

  const handleContinueShopping = () => {
    navigate(`/`);
  };

  const calculateSubTotal = () => {
    let total = 0;
    carts.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubTotal(total);
  };

  React.useEffect(() => {
    calculateSubTotal();
  }, [carts]);

  return (
    <div className="w-full max-w-screen-xl mx-auto flex mt-8">
      <div className="w-[70%] mr-4">
        <table className="w-[100%]">
          <thead className="bg-slate-200 h-8">
            <tr className="border-b border-slate-300 font-medium">
              <td className="text-left pl-2">Product</td>
              <td className="text-left pl-2">Price</td>
              <td className="text-left pl-2">Quantity</td>
              <td className="text-left pl-2">Subtotal</td>
              <td className="text-left"></td>
            </tr>
          </thead>
          <tbody>
            {carts.map((item, index) => (
              <CartItem key={index} product={item} />
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            className="text-white px-4 py-2 mr-4 bg-yellow-500 rounded-full"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
          <button
            onClick={handleClearCart}
            className="outline outline-1 outline-red-600 text-red-600 px-4 py-2 mr-4 rounded-full"
          >
            Clear Cart
          </button>
        </div>
      </div>
      <div className="w-[30%] border border-slate-200 h-56">
        <div className="bg-slate-200">
          <p className="font-semibold text-center h-8 flex justify-center items-center">
            <span className="my-4">Cart Total</span>
          </p>
        </div>

        <div className="mx-4">
          <div className="flex justify-between mt-6">
            <span>Subtotal:</span>
            <span>Rp.{subTotal}</span> {/* Menampilkan subTotal */}
          </div>
          <div className="mx-4 flex justify-center mt-4">
            <hr className="w-full border border-slate-200" />
          </div>
          <div className="flex justify-between mt-6">
            <span>Total:</span>
            <span>Rp.{subTotal}</span> {/* Menampilkan total */}
          </div>
          <button
            className="bg-yellow-500 text-white w-full px-4 py-2 rounded-full mt-6"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
