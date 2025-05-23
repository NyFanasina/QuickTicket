export interface Product {
	name: string;
	price: number;
	category: string;
	id: number;
	img: string ;
	// Only for filtering
	variants?: boolean;
	// Only available if ProductVariant
	variantName?: string;
}

export interface ProductVariant {
	name: string;
	variantName: string;
	price: number;
	category: string;
	id: number;
	originalId: number;
}

export const CATEGORIES = {
	HOT_DRINKS: "hot_drinks",
	PASTRIES: "pastries",
	ALL: "all",
}


export const PRODUCT_VARIANTS : ProductVariant[] = [
	{name: "Coffee with milk M", variantName: "M", price: 4.00, category: CATEGORIES.HOT_DRINKS, id: 101, originalId: 1},
	{name: "Coffee with milk L", variantName: "L", price: 4.50, category: CATEGORIES.HOT_DRINKS, id: 102, originalId: 1},
	{name: "Coffee with milk XL", variantName: "XL", price: 5.00, category: CATEGORIES.HOT_DRINKS, id: 103, originalId: 1},
	{name: "Cappuccino L", variantName: "L", price: 4.00, category: CATEGORIES.HOT_DRINKS, id: 104, originalId: 4},
	{name: "Cappuccino XL", variantName: "XL", price: 4.50, category: CATEGORIES.HOT_DRINKS, id: 105, originalId: 4},
]
