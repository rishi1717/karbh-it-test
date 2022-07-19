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

export default function SignIn() {
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		})
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
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
