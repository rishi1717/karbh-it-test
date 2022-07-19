import Users from "../Database/userModel.js"
import bcrypt from "bcrypt"

const userLogin = async (req, res) => {
    try{
        const { mobile, password } = req.body
        const user = await Users.findOne({ mobile })

        // if user doesn't exist
        if(!user){
            return res
                .status(400)
                .json({ message: "User doesn't exist" })
        }

        //password validation
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
            return res
                .status(400)
                .json({ message: "Invalid password" })
        }

        //generate token
        const token = user.generateToken(user)

        //response
        res.status(200).json({
            message: "User logged in successfully",
            user: user,
            token: token,
        })

    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

export default userLogin