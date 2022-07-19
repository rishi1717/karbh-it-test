import Users from "../Database/userModel.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const userRegister = async (req, res) => {
	try {
		const { name, mobile, password } = req.body
		const user = await Users.findOne({ mobile })

		// if user already exists
		if (user) {
			return res
				.status(400)
				.json({ message: "Mobile number already registered" })
		}

		//password encryption
		const salt = await bcrypt.genSalt(Number(process.env.SALT))
		const hashedPassword = await bcrypt.hash(password, salt)

		//create new user
		const newUser = new Users({
			name,
			mobile,
			password: hashedPassword,
		})
		const savedUser = await newUser.save()

		//response
		res.status(201).json({
			message: "User created successfully",
			user: savedUser,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: err.message })
	}
}

export default userRegister