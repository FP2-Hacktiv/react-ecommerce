import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchAllProduct,
  updateProduct,
} from "../../../store/global/globalAction";
import Toast from "../../../components/toast";
import Loading from "../../../components/loading";
import Modal from "react-modal";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.global);
  const [quantities, setQuantities] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [image, setImage] = useState(null);

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
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(0, prevQuantities[productId] - 1),
    }));
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
          message: `Update Stok ${item.name} Berhasil`,
        });
        handleGetAllProduct();
      })
      .catch(() => {
        Toast({
          type: "error",
          message: `Error Update Stok ${item.name}`,
        });
      });
  };

  const handleAddProduct = async () => {
    await dispatch(
      addProduct({
        data: {
          productName,
          productDescription,
          brand,
          category,
          price,
          stock,
          image,
        },
      })
    )
      .then(() => {
        Toast({
          type: "success",
          message: `Berhasil Menambahkan Barang`,
        });
        handleGetAllProduct();
        closeModal();
      })
      .catch(() => {
        Toast({
          type: "error",
          message: `Error Menambahkan Barang`,
        });
      });
  };

  const handleOpenModal = (item) => {
    setSelectedProduct(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
          className={`w-full flex justify-center items-center ${
            isLoading ? "h-[calc(100vh-300px)]" : null
          }`}
        >
          <Loading />
        </div>
      ) : (
        <div className="w-full max-w-screen-xl mx-auto flex mt-8">
          <div className="w-[70%] mx-auto">
            <div className="w-1/4 mb-2">
              <button
                className="bg-green-500 text-white w-full px-4 py-2 rounded-full"
                onClick={() => handleOpenModal(null)}
              >
                Tambah Produk
              </button>
              <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-1/3"
                contentLabel="Example Modal"
              >
                <div className="modal-header bg-sky-900 text-white flex justify-between items-center p-4">
                  Tambah Produk
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gray-400 focus:outline-none"
                  >
                    X
                  </button>
                </div>
                <div className="modal-body p-4">
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="productName"
                        className="block text-gray-600 text-sm font-medium mb-2"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        placeholder="Product Name"
                        className="border rounded-lg p-2 w-full"
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-gray-600 text-sm font-medium mb-2"
                      >
                        Product Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Product Description"
                        className="border rounded-lg p-2 w-full"
                        onChange={(e) => setProductDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="brand"
                        className="block text-gray-600 text-sm font-medium mb-2"
                      >
                        Brand
                      </label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        placeholder="Brand"
                        className="border rounded-lg p-2 w-full"
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="category"
                        className="block text-gray-600 text-sm font-medium mb-2"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Category"
                        className="border rounded-lg p-2 w-full"
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="price"
                        className="block text-gray-600 text-sm font-medium mb-2"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Price"
                        className="border rounded-lg p-2 w-full"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="stock"
                        className="block text-gray-600 text-sm font-medium mb-2"
                      >
                        Stock
                      </label>
                      <input
                        type="text"
                        id="stock"
                        name="stock"
                        placeholder="Stock"
                        className="border rounded-lg p-2 w-full"
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-gray-600 text-sm font-medium mb-2"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        placeholder="image"
                        className="border rounded-lg p-2 w-full"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 w-full disabled:cursor-not-allowed"
                      onClick={handleAddProduct}
                    >
                      {isLoading ? "Processing Your Login" : "Submit"}
                    </button>
                  </form>
                </div>
              </Modal>
            </div>
            <table className="w-[100%]">
              <thead className="bg-slate-200 h-8">
                <tr className="border-b border-slate-300 font-medium">
                  <td className="text-left pl-2">Produk</td>
                  <td className="text-left pl-2">Harga</td>
                  <td className="text-left pl-2">Kuantitas</td>
                  <td className="text-left pl-2">Aksi</td>
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
                          className={`px-2 py-1 border border-gray-300 rounded-md ${
                            quantities[item._id] === 0
                              ? "bg-gray-200 text-gray-400"
                              : ""
                          }`}
                          disabled={quantities[item._id] === 0}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={quantities[item._id] || 0}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [item._id]:
                                e.target.value === ""
                                  ? 0
                                  : parseInt(e.target.value) || "",
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
                      <div className="flex mx-auto gap-1">
                        <button
                          className="bg-yellow-500 text-white w-1/2 px-4 py-2 rounded-full"
                          onClick={() => handleUpdateProduct(item)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white w-1/2 px-4 py-2 rounded-full"
                          onClick={() => handleUpdateProduct(item)}
                        >
                          Delete
                        </button>
                      </div>
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
