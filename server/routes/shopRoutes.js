import express from "express"
import { shopLogin, shopSignIn } from "../controllers/shopController.js"
import upload from "../config/multer.js"

const shopRouter = express.Router()

shopRouter.post('/sign-in',upload.single("image"),shopSignIn)
shopRouter.post('/login',shopLogin)

export default shopRouter