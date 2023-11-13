export const getTokenFromLocalStorage = () => {
	try {
		const persistedStateJSON = localStorage.getItem("persist:root");
		if (!persistedStateJSON) {
			return null;
		}
		const persistedState = JSON.parse(persistedStateJSON);
		const authData = JSON.parse(persistedState.auth);
		const token = authData.token;

		return token;
	} catch (error) {
		return null;
	}
};

export const formatToIDR = (number) => {
	if (isNaN(number)) {
		return "Invalid input";
	}

	const [integerPart, decimalPart] = number.toFixed(2).toString().split(".");

	const formattedIntegerPart = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		","
	);

	const result = `Rp ${formattedIntegerPart}${
		decimalPart ? `.${decimalPart}` : ""
	}`;

	return result;
};
