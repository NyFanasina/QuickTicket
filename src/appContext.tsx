import React from "react";
import { Product } from "./components/products/products.model";
import { Order } from "./components/orders/order.model";

interface CartCTX {
	productsInCart: Product[];
	setProductsInCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

interface OrderCTX {
	orders: Order[];
	setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

interface ProductCTX {
	products: Product[];
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

interface ContextType {
	cartCTX: CartCTX;
	orderCTX: OrderCTX;
	productCTX: ProductCTX
}

export const appContext = React.createContext({} as ContextType);