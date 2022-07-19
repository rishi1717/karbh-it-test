import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				sx={{
					backgroundColor: "white",
					px: { xs: 0, sm: 20 },
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
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
