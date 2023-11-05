import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalReducer from "./global/globalSlice";
import authReducer from "./auth/authSlice";

const rootReducers = combineReducers({
	global: globalReducer,
	auth: authReducer,
});

const middlewares = [];
const persistConfig = {
	key: "root",
	storage,
};

const persistedReducers = persistReducer(persistConfig, rootReducers);

if (import.meta.env.DEV) {
	middlewares.push(logger);
}

export const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(logger),
});

export const persistor = persistStore(store);
