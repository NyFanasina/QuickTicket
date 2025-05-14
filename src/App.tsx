import React, { useEffect } from "react";
import "./App.css";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar/navbar.component";
import { CATEGORIES, Product } from "./components/products/products.model";
import { Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/cart";
import { appContext } from "./appContext";
import { Orders } from "./pages/orders";
import { NotFoundPage } from "./pages/notFoundPage";
import { DEFAULT_ORDERS, Order } from "./components/orders/order.model";

function App() {
	const [products, setProducts] = React.useState<Product[]>([
		{ "name": "Coffee with milk", "price": 3.5, "category": "hot_drinks", "id": 1, "img": "imgs/products/Coffee with milk.jpg" },
		{ "name": "Tea", "price": 2.5, "category": "hot_drinks", "id": 2, "img": "imgs/products/Tea.jpg" },
		{ "name": "Hot chocolate", "price": 4, "category": "hot_drinks", "id": 3, "img": "imgs/products/Hot chocolate.jpg" },
		{ "name": "Cappuccino", "price": 3, "category": "hot_drinks", "id": 4, "img": "imgs/products/Cappuccino.jpg" },
		{ "name": "Espresso", "price": 2, "category": "hot_drinks", "id": 5, "img": "imgs/products/Espresso.jpg" },
		{ "name": "Americano", "price": 3.5, "category": "hot_drinks", "id": 6, "img": "imgs/products/Americano.jpg" },
		{ "name": "Orange juice", "price": 3, "category": "hot_drinks", "id": 7, "img": "imgs/products/Orange juice.jpg" },
		{ "name": "Croissant", "price": 2, "category": "pastries", "id": 8, "img": "imgs/products/Croissant.jpg" },
		{ "name": "Muffin", "price": 2.5, "category": "pastries", "id": 9, "img": "imgs/products/Muffin.jpg" },
		{ "name": "Donut", "price": 2.5, "category": "pastries", "id": 10, "img": "imgs/products/Donut.jpg" },
		{ "name": "Bagel", "price": 2.5, "category": "pastries", "id": 11, "img": "imgs/products/Bagel.jpg" },
		{ "name": "Toast", "price": 2, "category": "pastries", "id": 12, "img": "imgs/products/Toast.jpg" },
		{ "name": "Pancakes", "price": 3.5, "category": "pastries", "id": 13, "img": "imgs/products/Pancakes.jpg" },
		{ "name": "Cheesecake", "price": 3.5, "category": "pastries", "id": 14, "img": "imgs/products/Cheesecake.jpg" },
	]);
	const [productsInCart, setProductsInCart] = React.useState<Product[]>(
		window.sessionStorage.getItem("cart")
			? JSON.parse(window.sessionStorage.getItem("cart")!)
			: []
	);
	const [orders, setOrders] = React.useState<Order[]>(
		window.localStorage.getItem("orders")
			? JSON.parse(window.localStorage.getItem("orders")!)
			: DEFAULT_ORDERS
	);
	const [filter, setFilter] = React.useState<string>(CATEGORIES.ALL);

	const applyFilter = (category: string) => {
		setFilter(category);
	};

	useEffect(() => {
		window.sessionStorage.setItem("cart", JSON.stringify(productsInCart));
	}, [productsInCart]);

	useEffect(() => {
		window.localStorage.setItem("orders", JSON.stringify(orders));
	}, [orders]);

	console.log(products.map(i => ({ ...i, img: `imgs/products/${i.name}.jpg` })))

	return (
		<>
			<appContext.Provider
				value={{
					cartCTX: { productsInCart, setProductsInCart },
					orderCTX: { orders, setOrders },
					productCTX: { products, setProducts },
				}}
			>
				<Navbar applyFilter={applyFilter} />
				<Routes>
					<Route path="/" element={<Home filter={filter} setFilter={setFilter} />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</appContext.Provider>
		</>
	);
}

export default App;
