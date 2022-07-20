import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Landing() {
	const token = localStorage.getItem("token")
	const navigate = useNavigate()
	useEffect(() => {
		if (token) {
			navigate("/home")
		} else {
			navigate("/login")
		}
	}, [token, navigate])
}

export default Landing
