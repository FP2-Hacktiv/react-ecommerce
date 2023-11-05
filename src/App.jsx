import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Detail from "./pages/detail";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/dashboard";
import RootLayout from "./components/root-layout";
import PageLayout from "./components/page-layout";
import ProtectedRoute from "./components/protected-route";
import ProductList from "./pages/admin/product-list";

const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/cart",
		element: (
			<ProtectedRoute>
				<Cart />
			</ProtectedRoute>
		),
	},
	{
		path: "/detail/:id",
		element: <Detail />,
	},
	{
		path: "/login",
		element: (
			<ProtectedRoute>
				<Login />
			</ProtectedRoute>
		),
	},
	{
		path: "/admin/dashboard",
		element: (
			<ProtectedRoute>
				<AdminDashboard />
			</ProtectedRoute>
		),
	},
	{
		path: "/admin/product-list",
		element: (
			<ProtectedRoute>
				<ProductList />
			</ProtectedRoute>
		),
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
