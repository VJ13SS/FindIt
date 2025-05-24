import express from "express";
import {

  addProduct,
  addShopEvents,
  getProducts,
  shopLogin,
  shopSignIn,
} from "../controllers/shopController.js";
import upload from "../config/multer.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const shopRouter = express.Router();

shopRouter.post("/sign-in", upload.single("image"), shopSignIn);
shopRouter.post("/login", shopLogin);
shopRouter.post(
  "/add-product",
  authMiddleware,
  upload.single("image"),
  addProduct
);
shopRouter.post("/add-event", authMiddleware, upload.single("image"), addShopEvents);
shopRouter.get('/get-products',authMiddleware,getProducts)



export default shopRouter;
