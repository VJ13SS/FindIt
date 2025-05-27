import express from "express";
import {
  addProduct,
  addShopEvents,
  changeBookingOrderStatus,
  changeEventStatus,
  changeProductStatus,
  getAllBookingOrders,
  getAllShops,
  getEvents,
  getProducts,
  getShopById,
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
shopRouter.post(
  "/add-event",
  authMiddleware,
  upload.single("image"),
  addShopEvents
);
shopRouter.get("/get-products", authMiddleware, getProducts);
shopRouter.post("/update-product-status", changeProductStatus);
shopRouter.get("/get-events", authMiddleware, getEvents);
shopRouter.post("/update-event-status", changeEventStatus);
shopRouter.get("/get-all-shops", getAllShops);
shopRouter.post("/get-shop-by-id", getShopById);
shopRouter.get("/get-all-booking-orders",authMiddleware,getAllBookingOrders)
shopRouter.post('/change-booking-order-status',changeBookingOrderStatus)

export default shopRouter;
