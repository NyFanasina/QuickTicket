import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment, Select, TextField } from "@mui/material";
import classes from "./css/modal-add-product.module.css"
import { appContext } from "../../appContext";

export const BasicModal: React.FC = () => {
	const { products, setProducts } = React.useContext(appContext).productCTX
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const nameRef = React.useRef<HTMLInputElement>(null);
	const priceRef = React.useRef<HTMLInputElement>(null);
	const imageRef = React.useRef<HTMLInputElement>(null);
	const categoryRef = React.useRef<HTMLInputElement>(null);

	const addCustomProduct = (e: React.FormEvent) => {
		e.preventDefault();
		const file = imageRef.current?.files?.[0];
		if (!file) return;
		const image = URL.createObjectURL(file)
		let nextProducts = products.slice()
		nextProducts.push({
			id: products[products.length - 1].id + 1,
			name: String(nameRef.current?.value),
			category: 'Custm',
			price: Number(priceRef.current?.value),
			img: image,
		})
		setProducts(nextProducts)
		setOpen(false);
	};

	return (
		<div>
			<Button size="small" color="info" variant="outlined" onClick={handleOpen}>
				{" "}
				<AddIcon />
				Custom Product
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<form onSubmit={addCustomProduct}>
					<Box className={classes["modal-style"]}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							<strong>Add a new product</strong>
						</Typography>

						<TextField
							required
							inputRef={nameRef}
							id="product-name-required"
							label="Product name"
							variant="standard"
							size="small"
							margin="dense"
						/>
						<TextField
							required
							inputRef={priceRef}
							id="product-price-required"
							label="Price"
							InputProps={{
								endAdornment: <InputAdornment position="end">€</InputAdornment>,
								inputProps: { min: 0, step: "any" },
							}}
							variant="standard"
							size="small"
							margin="dense"
							type="number"
						/>

						<Select
							required
							inputRef={categoryRef}
							id="product-price-required"
							label="Category"
							variant="standard"
							size="small"
							margin="dense"
							sx={{ mt: 2 }}
							type="number"
							defaultValue={"0"}
						>
							<option value="0" disabled >Select an option</option>
							<option value="pastries">Pastries</option>
							<option value="hot_drinks">Hot Drinks</option>
						</Select>
						<label style={{ marginTop: 18 }} htmlFor="product-image">
							<CloudUploadIcon color='primary' />
						</label>
						<TextField
							required
							sx={{ display: "none" }}
							inputRef={imageRef}
							id="product-image"
							label="Image"
							variant="standard"
							size="small"
							margin="dense"
							type="file"
						/>
						<Button
							size="small"
							color="success"
							variant="outlined"
							type="submit"
							sx={{ mt: 2 }}
						>
							Add to Cart
						</Button>
					</Box>
				</form>
			</Modal>
		</div >
	);
};
