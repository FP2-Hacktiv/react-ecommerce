import toast from "react-hot-toast";

const Toast = ({ type, message }) => {
	switch (type) {
		case "error":
			return toast.error(message);
		default:
			return toast.success(message);
	}
};

export default Toast;
