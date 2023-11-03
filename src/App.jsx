import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Detail from "./pages/detail";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/dashboard";
import RootLayout from "./components/root-layout";
import PageLayout from "./components/page-layout";

const routes = [
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
		path: "/login",
		element: <Login />,
	},
	{
		path: "/admin/dashboard",
		element: <AdminDashboard />,
	},
];

const routesWithRootLayout = routes.map((item) => ({
	path: item.path,
	element: (
		<RootLayout>
			<PageLayout>{item.element}</PageLayout>
		</RootLayout>
	),
}));

export const router = createBrowserRouter(routesWithRootLayout);
