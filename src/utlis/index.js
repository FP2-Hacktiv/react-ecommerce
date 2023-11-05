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
