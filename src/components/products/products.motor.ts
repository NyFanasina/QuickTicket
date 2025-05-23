import { existsIDInCart } from "../cart/cart.motor";
import { CATEGORIES, PRODUCT_VARIANTS, Product, ProductVariant } from "./products.model";

export const filterProducts = (productList: Product[], category: string): Product[] => {
	if (category === CATEGORIES.ALL) {
		return productList;
	}

	const productsFiltered = productList.filter((product: Product) => {
		if (product.category === category) {
			return product;
		}
	});
	return productsFiltered;
};

export const returnCategoryName = (filter: string): string => {
	switch (filter) {
		case "all":
			return "All Products";
		case "hot_drinks":
			return "Hot Drinks";
		case "pastries":
			return "Pastries";
		default:
			return "All Products";
	}
}

export const searchProductById = (products: Product[],id: number): Product => {
	return products.find((product) => product.id === id)!;
}

export const searchVariantById = (id: number): ProductVariant => {
	return PRODUCT_VARIANTS.find((product) => product.id === id)!;
}

export const generateCustomID = (productsInCart: Product[]): number => {
	let newCustomId;
	do {
		newCustomId = 1000 + Math.floor(Math.random() * 1000);
		console.log(newCustomId);
	} while (existsIDInCart(newCustomId, productsInCart));
	return newCustomId;
}