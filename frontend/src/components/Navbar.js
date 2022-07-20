import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

function Navbar() {
	const token = localStorage.getItem("token")
	const navigate = useNavigate()
	const handleLogout = async () => {
		const con = await Swal.fire({
			title: "Are you sure?",
			text: "User will be logged out!",
			background: "#eaeaea",
			color: "#595959",
			showCancelButton: true,
			cancelButtonColor: "#B81C1C",
			confirmButtonText: "Logout",
			confirmButtonColor: "#609ACF",
		})
		if (con.isConfirmed) {
			localStorage.removeItem("token")
			localStorage.removeItem("user")
			navigate("/login")
		}
	}
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				sx={{
					backgroundColor: "white",
					px: { xs: 0, sm: 15 },
					position: "fixed",
				}}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2, color: "#FF4361" }}
					>
						<ShoppingCartIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, color: "#000" }}
					>
						Kar<span style={{ color: "#FF4361" }}>bh</span>
					</Typography>
					{token ? (
						<Box
							sx={{
								display: "flex",
							}}
						>
							<Button
								color="inherit"
								sx={{
									color: "#707070",
									fontSize: "1rem",
								}}
								onClick={() => navigate("/home")}
							>
								Home
							</Button>
							<Button
								color="inherit"
								sx={{
									color: "#FF4361",
									fontSize: "0.8rem",
								}}
								onClick={handleLogout}
							>
								Logout
							</Button>
						</Box>
					) : (
						<Box
							sx={{
								display: "flex",
							}}
						>
							<Button
								color="inherit"
								sx={{
									color: "#707070",
									fontSize: "1rem",
								}}
								onClick={() => navigate("/login")}
							>
								Login
							</Button>
							<Button
								color="inherit"
								sx={{
									color: "#707070",
									fontSize: "1rem",
								}}
								onClick={() => navigate("/register")}
							>
								Register
							</Button>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
