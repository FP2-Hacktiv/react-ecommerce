import ModalForm from "react-modal";

const Modal = ({ isOpen, closeModal, className, contentLabel }) => {
  return (
    <ModalForm
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={className}
      contentLabel={contentLabel}
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
              htmlFor="Email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Please enter your email"
              className="border rounded-lg p-2 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="border rounded-lg p-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 w-full disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing Your Login" : "Submit"}
          </button>
        </form>
      </div>
    </ModalForm>
  );
};
