import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export default mongoose.connect(`${process.env.db_connect}`, (err) => {
	if (err) {
		console.log(err.message)
	} else {
		console.log("Connected to MongoDB")
	}
})
