import { Router } from "express"
import userLogin from "../Controllers/userLogin.js"
import userRegister from "../Controllers/userRegister.js"

const router = Router()

router.post("/", userRegister)

router.post("/login", userLogin)

export default router
