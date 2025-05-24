import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import shopModel from "../models/shop.js";
import productModel from "../models/products.js";
import eventModel from "../models/events.js";

const createToken = (id) => {
  return jwt.sign({ id }, "random#secret");
};

export const shopSignIn = async (req, res) => {
  const { name, email, password, address, city, contact } = req.body;
  const imageFile = `${req.file.filename}`;

  try {
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is of Invalid Format",
      });
    }

    const shopExists = await shopModel.findOne({ email });

    if (shopExists) {
      return res.json({ success: false, message: "Shop Already Registered" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password Should be of Minimum 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newShop = new shopModel({
      name: name,
      email: email,
      password: hashedPassword,
      address: address,
      city: city,
      contact: contact,
      image: imageFile,
    });

    await newShop.save();

    console.log("Shop Registered Successfully");

    return res.json({ success: true, message: "Shop Registered Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const shopLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is of invalid format",
      });
    }

    const shop = await shopModel.findOne({ email });

    if (!shop) {
      return res.json({ success: false, message: "Shop Not Registered" });
    }

    const token = createToken(shop._id);
    const userDetails = { token, user: shop, userType: "shop" };

    return res.json({ success: true, userDetails });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { product, price } = req.body;
  const productImage = `${req.file.filename}`;

  const shopId = req.shop._id;

  try {
    const newProduct = new productModel({
      name: product,
      price: price,
      image: productImage,
      shopId: shopId,
    });

    await newProduct.save();
    console.log("Product Added Successfully");
    return res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const addShopEvents = async (req, res) => {
  const { description } = req.body;
  const eventImage = `${req.file.filename}`;

  const shopId = req.shop._id;
  try {
    const newEvent = new eventModel({
      image: eventImage,
      description: description,
      shopId: shopId,
    });

    await newEvent.save();
    console.log("Event Added Successfully");
    return res.json({ success: true, message: "Event Added Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const shopId = req.shop._id;

    const products = await productModel.find({ shopId });
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
