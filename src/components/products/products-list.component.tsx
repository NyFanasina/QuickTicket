import { Box, Grid, Paper, Typography } from "@mui/material";
import { filterProducts } from "./products.motor";
import { ProductCard } from "./product-card.component";
import classes from "./css/products-list.module.css";
import { BasicModal } from "./modal-add-product.component";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { appContext } from "../../appContext";

interface ProductsListProps {
	filter: string;
	setFilter: Dispatch<SetStateAction<string>>
}


const categories = [
	{ title: "All", filter: "all" },
	{ title: "Hot Drinks", filter: "hot_drinks" },
	{ title: "Pastries", filter: "pastries" },
];


export const ProductsList: React.FC<ProductsListProps> = (props) => {
	const { filter, setFilter } = props;
	const { products } = useContext(appContext).productCTX;
	const productsFiltered = filterProducts(products, filter);

	return (
		<Paper className={classes["products-container"]} elevation={5} square>
			<Box className={classes["title-container"]}>
				<Typography
					className={classes["products-title"]}
					variant="h6"
					component="h2"
				>
					Listing:
				</Typography>
				<Box flex={'1'} display={"flex"} justifyContent={"space-between"} alignItems={'center'}>
					<Box display={"flex"} gap={0.6}>
						{categories.map(item => (<button key={item.title} onClick={() => setFilter(item.filter)}>{item.title}</button>))}
					</Box>
					<BasicModal />
				</Box>
			</Box>
			<Grid container spacing={2}>
				{productsFiltered.map((product, index) => (
					<Grid key={index} item xl={2} lg={3} md={4} sm={3} xs={6}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};
