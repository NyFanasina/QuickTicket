import { useState } from "react";
import {
	AppBar,
	Badge,
	Button,
	Drawer,
	Toolbar,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import FoodBank from "@mui/icons-material/FoodBank";
import { NavListDrawer } from "./navbar-list-drawer.component";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NavLink, useLocation } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';

import React from "react";
import { appContext } from "../../appContext";
import { isCartEmpty } from "../cart/cart.motor";

const drawerLinks = [
	{ title: "All", filter: "all" },
	{ title: "Hot Drinks", filter: "hot_drinks" },
	{ title: "Pastries", filter: "pastries" },
];

interface NavBarProps {
	applyFilter: (category: string) => void;
}

export const Navbar: React.FC<NavBarProps> = (props) => {
	const { productsInCart } = React.useContext(appContext).cartCTX;
	const { applyFilter } = props;
	const [open, setOpen] = useState(false);
	const location = useLocation();

	const enableCartButton = () => {
		let cartButton;
		if (!isCartEmpty(productsInCart)) {
			cartButton = (
				<Button component={NavLink} to={"/cart"}>
					<ShoppingBasketIcon color="success" />
					<Badge badgeContent={productsInCart.length} color="warning"></Badge>
				</Button>
			);
		} else {
			cartButton = (
				<Button component={NavLink} to={"/cart"} disabled>
					<ShoppingBasketIcon color="disabled" />
				</Button>
			);
		}
		return cartButton;
	};

	return (
		<>
			<Box sx={{ display: "flex" }}></Box>
			<AppBar position="sticky" color="default" sx={{backgroundColor:"white"}}>
				<Toolbar
					sx={{
						justifyContent: location.pathname === "/" ? "space-between" : "flex-end",
					}}
				>
					<Button
						sx={{ display: location.pathname === "/" ? "flex" : "none" }}
						color="inherit"
						aria-label="menu"
						onClick={() => setOpen(true)}
					>
						<FoodBank sx={{ color: "#333" }} fontSize="large"/>
						<Typography variant="h6" sx={{ ml: 1, textTransform: "none" }}>
							QuickTicket
						</Typography>
					</Button>
{/* 
					<Box>
						<Button component={NavLink} to={"/"}>
							<HomeIcon color="action" />
						</Button>
						<Button component={NavLink} to={"/orders"}>
							<ListAltIcon color="action"/>
						</Button>
						{enableCartButton()}
					</Box> */}
				</Toolbar>
			</AppBar>

			{/* <Drawer anchor="lef<MdFoodBank />t" open={open} onClose={() => setOpen(false)}>
				<NavListDrawer
					onClick={() => setOpen(false)}
					navLinks={drawerLinks}
					applyFilter={applyFilter}
				/>
			</Drawer> */}
		</>
	);
};
