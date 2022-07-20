import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LoginIcon from "@mui/icons-material/Login"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Link } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "../axios.js"
import Swal from "sweetalert2"
import validateSignIn from "../functions/validateSignIn.js"

const Toast = Swal.mixin({
	background: "#1E1E1E",
	color: "white",
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timerProgressBar: true,
})

export default function SignIn() {
	const navigate = useNavigate()
	const [errors, setErrors] = React.useState({})

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()
			const data = new FormData(event.currentTarget)
			const err = validateSignIn(data)
			setErrors(err)
			if (err.password || err.mobile) {
				return
			}

			const details = {
				mobile: data.get("mobile"),
				password: data.get("password"),
			}

			const res = await axios.post("/user/login", details)
			localStorage.setItem("token", res.data.token)
			localStorage.setItem("user", res.data.user)
			Toast.fire({
				position: "bottom-right",
				icon: "success",
				title: "user Logged in",
				showConfirmButton: false,
				timer: 3000,
			})
			navigate("/home")
		} catch (err) {
			if (err.response.data.message) {
				setErrors({ ...errors, server: err.response.data.message })
			}
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
					<LoginIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1 }}
				>
					<Grid container spacing={0}>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="mobile"
								label="Mobile"
								name="mobile"
								autoComplete="email"
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
								{errors.mobile ? errors.mobile : ""}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
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

						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</Button>
						</Grid>
					</Grid>
					<Grid container>
						<Link
							onClick={() => {
								navigate("/register")
							}}
							sx={{
								cursor: "pointer",
							}}
						>
							<Grid item>{"Don't have an account? Sign Up"}</Grid>
						</Link>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}
