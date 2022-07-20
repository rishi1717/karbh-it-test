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

		//validate input
		const validate = validateUser(req.body)
		if (validate) {
			return res.status(400).json({
				message: validate,
			})
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
		console.log(err.message)
		res.status(500).json({ message: err.message })
	}
}


//validate user input
const validateUser = (data) => {
	console.log(data)
	const { name, mobile, password } = data
	const pswPattern = /^[a-zA-Z0-9]{8,}$/
	const mobilePattern = /^[0-9]{10}$/

	if (!name || !mobile || !password) {
		return "Missing required fields"
	} else if (mobilePattern.test(mobile) === false) {
		return "Provide a valid mobile number"
	} else if (password.length < 8) {
		return "Password should be atleast 8 characters long"
	} else if (pswPattern.test(password) === false) {
		return "Password should not contain special characters"
	} else {
		return null
	}
}

export default userRegister
