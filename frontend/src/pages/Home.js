import React, { useEffect, useState } from "react"
import axios from "axios"
import { Grid, TextField, Typography } from "@mui/material"
import ProductCard from "../components/ProductCard"
import backgroundImage from "../assets/background.jpg"
import { Box } from "@mui/system"

function Home() {
	const [products, setProducts] = useState([])
	const [result, setResult] = useState([])
	const [searchValue, setSearchValue] = useState("")
	useEffect(() => {
		;(async () => {
			const res = await axios.get("http://mmb.karbh.com/api/v1/categories")
			setProducts(res.data)
		})()
	}, [])

	const handleSearch = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		setSearchValue(data.get("search").toLowerCase())
	}

	useEffect(() => {
		const searchResult = products.filter((obj) =>
			obj.name.toLowerCase().includes(searchValue)
		)
		setResult(searchResult)
	}, [searchValue, products])

	return (
		<>
			<Box
				sx={{
					height: 400,
					backgroundColor: "#FF4361",
					backgroundImage: `url(${backgroundImage})`,
					mt: 5,
					mx: -1,
				}}
			></Box>
			<Typography
				sx={{
					fontSize: "2rem",
					mt: 2,
					color: "#A0A0A0",
					textAlign: "center",
				}}
			>
				Product Categories
			</Typography>
			<Box
				display="flex"
				justifyContent="center"
				component="form"
				autoComplete="off"
				onChange={handleSearch}
				onSubmit={handleSearch}
				noValidate
				sx={{ mt: 1, mb: 2 }}
			>
				<TextField
					margin="normal"
					fullWidth
					id="search"
					label="Search for Product Categories"
					name="search"
					autoFocus
					variant="standard"
					sx={{ width: "70%" }}
				/>
			</Box>
			{searchValue.length > 0 && (
				<>
					<Typography
						sx={{
							fontSize: "1.2rem",
							mt: 2,
							ml: { xs: 5, md: 10 },
							color: "#A0A0A0",
						}}
					>
						Search result for "{searchValue}"
					</Typography>
				</>
			)}
			<Grid
				container
				spacing={2}
				mt={2}
				px={{ xs: 2, sm: 4, md: 10, lg: 15 }}
				mb={5}
			>
				{searchValue.length > 0
					? result.map((product) => (
							<Grid key={product.id} item xs={6} sm={4} md={3}>
								<ProductCard product={product} />
							</Grid>
					  ))
					: products.map((product) => (
							<Grid key={product.id} item xs={6} sm={4} md={3}>
								<ProductCard product={product} />
							</Grid>
					  ))}
			</Grid>
		</>
	)
}

export default Home
