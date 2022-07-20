import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useNavigate } from "react-router-dom"
import { Link } from "@mui/material"
import validateSignUp from "../functions/validateSignUp"
import axios from "../axios.js"
import Swal from "sweetalert2"

const Toast = Swal.mixin({
	background: "#1E1E1E",
	color: "white",
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timerProgressBar: true,
})

export default function SignUp() {
	const navigate = useNavigate()

	const [errors, setErrors] = React.useState({})

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()
			const data = new FormData(event.currentTarget)
			const err = validateSignUp(data)
			setErrors(err)
			if (err.email || err.password || err.mobile) {
				console.log("error")
				return
			}
			const details = {
				name: data.get("name"),
				mobile: data.get("mobile"),
				password: data.get("password"),
			}
			await axios.post("/user", details)
			Toast.fire({
				position: "bottom-right",
				icon: "success",
				title: "user registered",
				showConfirmButton: false,
				timer: 3000,
			})
			navigate("/login")
		} catch (err) {	
			if (err.response.data.message){
				setErrors({ ...errors, server: err.response.data.message })
			} console.log(err.response.data.message)
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 20,
					backgroundColor: "#F0F0F0",
					padding: "2rem",
					borderRadius: "1rem",
					boxShadow: "0px 1px 0px 0px #707070",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<HowToRegIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<TextField
								autoComplete="given-name"
								name="name"
								required
								fullWidth
								id="name"
								label="Name"
								autoFocus
							/>
							<Typography
								sx={{
									color: "red",
									fontSize: "0.85rem",
									textAlign: "center",
									mt: 1,
								}}
							>
								{errors.name ? errors.name : ""}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="mobile"
								label="Mobile"
								name="mobile"
							/>
							<Typography
								sx={{
									color: "red",
									fontSize: "0.85rem",
									textAlign: "center",
									mt: 1,
								}}
							>
								{errors.mobile ? errors.mobile : ""}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
							/>
							<Typography
								sx={{
									color: "red",
									fontSize: "0.85rem",
									textAlign: "center",
									mt: 1,
								}}
							>
								{errors.password ? errors.password : ""}
							</Typography>
						</Grid>
					</Grid>
					<Typography
						sx={{
							color: "red",
							fontSize: "0.85rem",
							textAlign: "center",
							mt: 1,
						}}
					>
						{errors.server ? errors.server : ""}
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container>
						<Link
							onClick={() => {
								navigate("/login")
							}}
							sx={{
								cursor: "pointer",
							}}
						>
							<Grid item>{"Already have an account? Sign In"}</Grid>
						</Link>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}
