import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Product } from "./products.model";
import classes from "./css/products-card.module.css";
import { SelectVariant } from "./modal-select-variant.component";
import React, { useContext } from "react";
import { appContext } from "../../appContext";
import { searchProductById } from "./products.motor";
import { openSnackBarProductAdded } from "../snackbar/snackbar.motor";

interface ProductCardProps {
	product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
	const { name, price, variants, img } = props.product;
	const { productsInCart, setProductsInCart } = React.useContext(appContext).cartCTX;
	const { products } = useContext(appContext).productCTX;

	const addToCart = (id: number) => {
		const productFinded = searchProductById(products, id);
		setProductsInCart([...productsInCart, productFinded]);
	};

	const createButton = () => {
		if (variants) {
			return <SelectVariant product={props.product} />;
		} else {
			return (
				<Button
					className={classes["card-actions-button"]}
					size="small"
					color="success"
					variant="outlined"
					onClick={() => {
						addToCart(props.product.id);
						openSnackBarProductAdded(name, price);
					}}
				>
					Add
				</Button>
			);
		}
	};


	return (
		<Card className={classes["card"]}>
			<Box sx={{ position: "relative", height: 145, width: "100%", overflow: "hidden" }}>
				<CardMedia
					component="img"
					alt={name}
					image={img}
					style={{ objectFit: 'contain' }}
				/>
			</Box>
			<CardContent className={classes["card-content"]}>
				<Typography gutterBottom variant="body2" component="h3">
					{name}
				</Typography>
			</CardContent>
			<CardActions className={classes["card-actions"]}>
				<Typography gutterBottom variant="body2" component="p">
					{price.toFixed(2)}€
				</Typography>
				{createButton()}
			</CardActions>
		</Card>
	);
};
