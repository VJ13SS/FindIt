import express from "express"
import { bookItems, getBookedOrders, loginUser, registerUser, searchItem } from "../controllers/userController.js"


const userRouter = express.Router()

userRouter.post("/sign-in",registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/search',searchItem)
userRouter.post('/book-items',bookItems)
userRouter.post('/get-booked-orders',getBookedOrders)

export default userRouter