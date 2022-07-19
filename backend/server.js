import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import userRoutes from "./routes/userRoutes.js"
import connect from "./Database/index.js"

connect
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1000,
	message: "Too many requests from this IP, please try again in 10 minutes",
})

//middlewares
app.use("/api", limiter)
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/api/user", userRoutes)

//error handling
app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message })
})

//server up and listening
app.listen(port, (err) => {
	if (err) {
		console.log(err)
	} else {
		console.log(`listening at http://localhost:${port}`)
	}
})
