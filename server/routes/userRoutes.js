import express from "express"
import { loginUser, registerUser, searchItem } from "../controllers/userController.js"


const userRouter = express.Router()

userRouter.post("/sign-in",registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/search',searchItem)
export default userRouter