import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import React from "react"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { Box } from "@mui/system"

function ProductCard({ product }) {
	const addToCart = async () => {}
	const imag1 = require(`../assets/${product.image}`)
	return (
		<>
			<Card
				sx={{
					height: "100%",
					backgroundColor: "#E0E0E0",
				}}
			>
				<CardMedia
					component="img"
					height="100"
					image={imag1}
					alt={product.image}
				/>
				<CardContent>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Typography
							gutterBottom
							variant="h5"
							component="div"
							sx={{
								color: "#686868",
							}}
						>
							{product.name}
						</Typography>
						<Box
							sx={{
								color: "#696969",
								cursor: "pointer",
								"&:hover": {
									transform: "scale(1.1)",
								},
							}}
							onClick={addToCart}
						>
							<AddShoppingCartIcon />
						</Box>
					</Box>
				</CardContent>
			</Card>
		</>
	)
}

export default ProductCard
