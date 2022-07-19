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

const validate = (data) => {
    const errors = {}
    if(!data.name){
        errors.name = "Name is required"
    }
    if (!data.mobile) {
        errors.mobile = "Mobile number is required"
    }
    if (!data.password) {
        errors.password = "Password is required"
    }
    return errors
}

export default function SignUp() {
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		validate(data)


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
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="mobile"
								label="Mobile"
								name="mobile"
							/>
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
						</Grid>
					</Grid>
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
