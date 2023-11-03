import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Detail from "./pages/detail";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/dashboard";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/detail/:id",
		element: <Detail />,
	},
	{
		path: "/auth/login",
		element: <Login />,
	},
	{
		path: "/admin/dashboard",
		element: <AdminDashboard />,
	},
]);
