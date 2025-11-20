import express from "express"
import { signIn, signOut, signUp, me } from "../controllers/auth.controllers.js"
import isAuth from "../middlewares/isAuth.js"

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.get("/signout", signOut)
authRouter.get("/me", isAuth, me)

export default authRouter
