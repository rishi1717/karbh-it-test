import mongoose from "mongoose"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

//user model
let userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	mobile: { type: String, required: true, unique: true },
	password: { type: String, required: true },
})

//json web token creation
userSchema.methods.generateToken = (user) => {
	return JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	})
}

const Users = mongoose.model("Users", userSchema)

export default Users
